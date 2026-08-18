#!/usr/bin/env node
/**
 * One-off cleanup: remove the `healthProfile` field from user documents.
 *
 * WHY THIS EXISTS
 * The meal-planning feature was removed from the application, and the field was
 * dropped from the Mongoose schema. Removing a field from a schema does not
 * remove it from documents already in the database: Mongo keeps whatever is on
 * disk. Those documents may still hold health conditions such as diabetes and
 * blood pressure, plus age, weight and height.
 *
 * Under UK GDPR, data concerning health is special-category data (Article 9).
 * Once the purpose it was collected for no longer exists, continuing to store it
 * is the problem this script solves.
 *
 * HOW IT BEHAVES
 * Dry run by default. It reports what it would change and exits without writing.
 * Nothing is modified unless --commit is passed explicitly.
 *
 *   node scripts/purge-health-profile.js              # dry run, writes nothing
 *   node scripts/purge-health-profile.js --commit     # performs the unset
 *
 * It prints counts before and after so the result is verifiable rather than
 * assumed, and it targets only the one field: no document is deleted, and no
 * other field is touched.
 *
 * BEFORE RUNNING AGAINST PRODUCTION
 * Take a backup you have restored from at least once. This is not reversible.
 * Run it on its own, not as part of an application deploy, so that if it goes
 * wrong there is exactly one change to reason about.
 *
 * MONGODB_URI must be present in the environment. It is never read from a file
 * by this script and must not be pasted into it.
 */

const mongoose = require('mongoose');

const FIELD = 'healthProfile';
const COMMIT = process.argv.includes('--commit');

function fail(message) {
  console.error(`\n  ${message}\n`);
  process.exit(1);
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) fail('MONGODB_URI is not set. Export it in the shell you run this from.');

  // Show which host is about to be touched, without printing credentials.
  let host = 'unknown';
  try {
    host = new URL(uri.replace(/^mongodb\+srv:\/\//, 'https://').replace(/^mongodb:\/\//, 'http://')).host;
  } catch {
    /* leave as unknown */
  }

  console.log(`\n  mode      ${COMMIT ? 'COMMIT (will write)' : 'DRY RUN (no writes)'}`);
  console.log(`  cluster   ${host}`);
  console.log(`  field     ${FIELD}\n`);

  await mongoose.connect(uri);
  const users = mongoose.connection.db.collection('users');

  const query = { [FIELD]: { $exists: true } };
  const totalUsers = await users.countDocuments({});
  const before = await users.countDocuments(query);

  console.log(`  users total                     ${totalUsers}`);
  console.log(`  users carrying ${FIELD}   ${before}`);

  if (before === 0) {
    console.log('\n  Nothing to do. No document carries the field.\n');
    await mongoose.disconnect();
    return;
  }

  // A small sample of the keys held, so the operator can see the shape of what
  // is about to go. Keys only: the values are the sensitive part and are never
  // printed.
  const sample = await users.find(query).limit(5).project({ [FIELD]: 1 }).toArray();
  const keys = new Set();
  sample.forEach((doc) => Object.keys(doc[FIELD] || {}).forEach((k) => keys.add(k)));
  if (keys.size) console.log(`  keys present (sample)           ${[...keys].join(', ')}`);

  if (!COMMIT) {
    console.log(`\n  Dry run. ${before} document(s) would have ${FIELD} unset.`);
    console.log('  Re-run with --commit to apply.\n');
    await mongoose.disconnect();
    return;
  }

  const result = await users.updateMany(query, { $unset: { [FIELD]: '' } });
  const after = await users.countDocuments(query);
  const totalAfter = await users.countDocuments({});

  console.log(`\n  matched                         ${result.matchedCount}`);
  console.log(`  modified                        ${result.modifiedCount}`);
  console.log(`  users still carrying the field  ${after}`);
  console.log(`  users total (unchanged)         ${totalAfter}`);

  if (after !== 0) fail(`${after} document(s) still carry ${FIELD}. Investigate before assuming this is done.`);
  if (totalAfter !== totalUsers) fail('User count changed. That should be impossible here. Investigate immediately.');

  console.log('\n  Done. Field removed, no documents lost.\n');
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
