import React from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(mode, values) {
  const nextErrors = {};

  if (!values.email.trim()) {
    nextErrors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(values.email)) {
    nextErrors.email = 'Please enter a valid email address.';
  }

  if (!values.password) {
    nextErrors.password = 'Password is required.';
  } else if (values.password.length < 6) {
    nextErrors.password = 'Password must be at least 6 characters.';
  }

  if (mode === 'register') {
    if (!values.confirmPassword) {
      nextErrors.confirmPassword = 'Confirm your password.';
    } else if (values.password !== values.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }
  }

  return nextErrors;
}

function FormField({ name, type, placeholder, value, onChange, error, onBlur }) {
  return (
    <div className="w-full">
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={[
          'w-full rounded-[8px] border bg-white px-3 py-3 text-[14px] font-normal text-[#333333] placeholder:text-[14px] placeholder:font-normal placeholder:text-[#999999] focus:border-[#007BFF] focus:outline-none',
          error ? 'border-[#FF4D4F]' : 'border-[#CCCCCC]',
        ].join(' ')}
      />
      {error ? <p className="mt-1 text-[12px] text-[#FF4D4F]">{error}</p> : null}
    </div>
  );
}

export default function Login() {
  const [mode, setMode] = React.useState('login');
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const isRegister = mode === 'register';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleBlur = () => {
    setErrors(validateForm(mode, values));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateForm(mode, values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
    }, 700);
  };

  const switchMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
    setErrors({});
    setValues((prev) => ({ ...prev, password: '', confirmPassword: '' }));
  };

  const hasErrors = Object.values(errors).some(Boolean);
  const isIncomplete = !values.email || !values.password || (isRegister && !values.confirmPassword);
  const isDisabled = isSubmitting || isIncomplete || hasErrors;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F8F8] px-4 py-10">
      <div className="w-[90%] max-w-[400px] rounded-[12px] bg-[#FFFFFF] p-6 shadow-sm">
        <h1 className="text-center text-[24px] font-bold text-[#333333]">
          {isRegister ? 'Create Account' : 'Login'}
        </h1>

        <form className="mt-6" onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <FormField
              name="email"
              type="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
            />
            <FormField
              name="password"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
            />
            {isRegister ? (
              <FormField
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirmPassword}
              />
            ) : null}
          </div>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={switchMode}
              className="text-[14px] text-[#007BFF] hover:underline"
            >
              {isRegister ? 'Already have an account? Login' : 'No account? Register'}
            </button>
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className="mt-8 h-12 w-full rounded-[8px] bg-[#007BFF] text-[16px] font-bold text-[#FFFFFF] transition-colors hover:bg-[#0056b3] disabled:cursor-not-allowed disabled:bg-[#CCCCCC]"
          >
            {isSubmitting ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
