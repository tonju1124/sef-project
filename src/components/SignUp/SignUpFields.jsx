import LoginInputField from "../Login/LoginInputField";

function SignUpFields({
  username,
  setUsername,
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
  faculty,
  setFaculty,
  customFaculty,
  setCustomFaculty,
  openDropdown,
  setOpenDropdown,
  CustomDropdown,
  handleFacultyChange,
  facultyError,
  customFacultyError,
  setCustomFacultyError,
}) {
  return (
    <>
      <LoginInputField
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        isPasswordField={false}
      />

      <LoginInputField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        isPasswordField={false}
      />

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Faculty</label>
        <CustomDropdown
          label="faculty"
          value={faculty === "Others" || (customFaculty && faculty !== "FCI" && faculty !== "FOM" && faculty !== "FCM" && faculty !== "FAC" && faculty !== "FAIE") ? "Others" : faculty}
          options={[
            { value: "FCI", label: "FCI - Faculty of Computing and Informatics" },
            { value: "FOM", label: "FOM - Faculty of Accountancy and Management" },
            { value: "FCM", label: "FCM - Faculty of Commerce and Management" },
            { value: "FAC", label: "FAC - Faculty of Arts and Communication" },
            { value: "FAIE", label: "FAIE - Faculty of Applied Information and Engineering" },
            { value: "Others", label: "Others" }
          ]}
          onChange={handleFacultyChange}
          isOpen={openDropdown === "faculty"}
          hasError={facultyError}
        />
        {faculty === "Others" ? (
          <input
            type="text"
            value={customFaculty}
            onChange={(e) => {
              setCustomFaculty(e.target.value);
              setFaculty(e.target.value || "Others");
              if (e.target.value.trim()) {
                setCustomFacultyError(false);
              }
            }}
            placeholder="Enter your faculty name"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 mt-2 transition-all ${
              customFacultyError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
        ) : null}
      </div>

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
