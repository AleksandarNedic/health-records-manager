import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useLogin from "../../hooks/useLogin";
import "../../App.css";

type LoginFormData = {
  email: string;
  password: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { login, error, loading } = useLogin();
  const navigate = useNavigate();

  function onSubmit(data: LoginFormData) {
    login(data.email, data.password);
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <i className="bi bi-heart-pulse"></i>
        </div>

        <p className="login-label">HEALTH RECORDS MANAGER</p>
        <h2>Welcome back</h2>
        <p className="login-subtitle">Sign in to access your health space.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
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
              <p className="text-danger small mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="form-control login-input"
              {...register("password", {
                required: "Password is required.",
              })}
            />

            {errors.password && (
              <p className="text-danger small mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {error && (
            <div className="login-error" role="alert">
              <i className="bi bi-exclamation-circle me-2"></i>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn login-button w-100"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
            {!loading && <i className="bi bi-arrow-right ms-2"></i>}
          </button>
        </form>

        <div className="login-divider">
          <span>NEW HERE?</span>
        </div>

        <button
          type="button"
          className="btn create-account-button w-100"
          onClick={() => navigate("/register")}
        >
          <i className="bi bi-person-plus me-2"></i>
          Create account
        </button>

        <p className="login-footer">Your health journey, all in one place.</p>
      </div>
    </div>
  );
}

export default Login;
