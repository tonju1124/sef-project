import LoginAlert from "./LoginAlert";
import LoginInputField from "./LoginInputField";
import LoginFormFooter from "./LoginFormFooter";
import LoginSubmitButton from "./LoginSubmitButton";
import LoginSignUpLink from "./LoginSignUpLink";

/**
 * LoginForm Component
 * 
 * The main login form containing all input fields, validation alerts, and submit functionality.
 * Manages form state and renders sub-components for inputs, alerts, and buttons.
 */
function LoginForm({
  id,
  setId,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  isLoading,
  error,
  success,
  onSubmit,
}) {
  return (
    <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-lg">
      <form onSubmit={onSubmit} className="space-y-5">
        {error && <LoginAlert type="error" message={error} />}
        {success && <LoginAlert type="success" message="" />}

        <LoginInputField
          label="ID"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter your ID"
          isPasswordField={false}
        />

        <LoginInputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          isPasswordField={true}
        />

        <LoginFormFooter />

        <LoginSubmitButton isLoading={isLoading} />
      </form>

      <LoginSignUpLink />
    </div>
  );
}

export default LoginForm;
