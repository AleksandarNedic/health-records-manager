import { useForm, useWatch } from "react-hook-form";
import { Link } from "react-router";
import "../../App.css";

type RegisterFormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = useWatch({
    control,
    name: "password",
  });

  function onSubmit(data: RegisterFormData) {
    console.log(data);
  }


  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <i className="bi bi-heart-pulse"></i>
        </div>

        <p className="login-label">HEALTH RECORDS MANAGER</p>

        <h2>Create account</h2>

        <p className="login-subtitle">
          Create your account to manage your health records.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Full name
            </label>

            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              className="form-control login-input"
              {...register("fullName", {
                required: "Full name is required.",
                minLength: {
                  value: 2,
                  message: "Name must contain at least 2 characters.",
                },
              })}
            />

            {errors.fullName && (
              <p className="text-danger small mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="form-control login-input"
              {...register("email", {
                required: "Email is required.",
              })}
            />

            {errors.email && (
              <p className="text-danger small mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Create a password"
              className="form-control login-input"
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must contain at least 6 characters.",
                },
              })}
            />

            {errors.password && (
              <p className="text-danger small mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm password
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="form-control login-input"
              {...register("confirmPassword", {
                required: "Please confirm your password.",
                validate: (value) =>
                  value === password || "Passwords do not match.",
              })}
            />

            {errors.confirmPassword && (
              <p className="text-danger small mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn login-button w-100"
          >
            Create account
            <i className="bi bi-arrow-right ms-2"></i>
          </button>
        </form>

        <div className="login-divider">
          <span>ALREADY HAVE AN ACCOUNT?</span>
        </div>

        <Link
          to="/login"
          className="btn create-account-button w-100"
        >
          Sign in
        </Link>

        <p className="login-footer">
          Your health journey, all in one place.
        </p>
      </div>
    </div>
  );
}

export default Register;
