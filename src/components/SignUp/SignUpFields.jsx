import LoginInputField from "../Login/LoginInputField";
import RoleDropdown from "./RoleDropdown";
import FacultyDropdown from "./FacultyDropdown";

/**
 * SignUpFields Component
 * 
 * Renders all input fields required for user registration.
 * Includes email, role, faculty, password, and confirm password fields with associated state management.
 */
function SignUpFields({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  role,
  setRole,
  faculty,
  setFaculty,
  customFaculty,
  setCustomFaculty,
  CustomDropdown,
  handleRoleChange,
  handleFacultyChange,
  roleError,
  facultyError,
  customFacultyError,
  setCustomFacultyError,
}) {
  return (
    <>
      {/* Email input field */}
      <LoginInputField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        isPasswordField={false}
      />

      {/* Role selection dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Role</label>
        <RoleDropdown
          value={role}
          onChange={handleRoleChange}
          hasError={roleError}
        />
      </div>

      {/* Faculty selection dropdown with custom input option */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Faculty</label>
        <FacultyDropdown
          value={faculty}
          customFaculty={customFaculty}
          setCustomFaculty={setCustomFaculty}
          onChange={handleFacultyChange}
          hasError={facultyError}
          customFacultyError={customFacultyError}
          setCustomFacultyError={setCustomFacultyError}
        />
      </div>

      {/* Password input field with visibility toggle */}
      <LoginInputField
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        isPasswordField={true}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(!showPassword)}
      />

      {/* Confirm password input field with visibility toggle */}
      <LoginInputField
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm your password"
        isPasswordField={true}
        showPassword={showConfirmPassword}
        onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
      />
    </>
  );
}

export default SignUpFields;
