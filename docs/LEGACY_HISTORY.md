# Legacy history: the pre-React Next.js site

This repo's git history is **not** continuous with the first version of the
site. Reading `git log` here will not show anything before 2025-06-11.

## What happened

The site was originally built as a **Next.js** app (app router + Tailwind),
finished 2025-06-08. Three days later it was rebuilt from scratch as the
current React app, and this remote was **force-pushed** past the old history.
The first commit in this repo, `4d2fa0c0` (2025-06-11, "Initial commit:
Honeyspice Cuisine website"), begins an unrelated history.

The two histories share no commits. Verify with:

```bash
git cat-file -e c0be59777f44cea57ef909bf2ce79b79655bd499
# fails: the legacy tip is not in this repo
```

## Where the old version lives now

Those 8 Next.js commits are **not on GitHub**. The force-push removed them,
and `refs/pull/1/head` preserves only a fragment, not the tip. They exist
only in a git bundle:

| File | Contents |
| --- | --- |
| `~/honeyspice-legacy-nextjs-minimal.bundle` | 8 commits, tip `c0be5977`. Preferred. |
| `~/honeyspice-legacy-nextjs.bundle` | Superset, also carries this repo's history. Redundant. |
| `~/honeyspice-legacy-nextjs-MANIFEST.txt` | sha256 checksums, provenance, restore steps. |

Restore it read-only, without touching this repo:

```bash
git clone ~/honeyspice-legacy-nextjs-minimal.bundle /tmp/honeyspice-legacy
```

Expect 8 commits back to `606e2fe` and a tree containing `app/`,
`next.config.js` and `tailwind.config.ts`. Verified by restore test on
2026-08-17.

## Why this matters

Until the bundle is copied off the machine it was created on, the original
site exists in exactly one place. Treat it as irreplaceable, and check it
against the sha256 in the manifest before relying on it.

There was also a stale working copy at `~/HoneySpice Cuisine/honeyspicecuisine`
holding this same legacy history. It was removed on 2026-08-17 only after the
bundle was created, verified, and restore-tested.
