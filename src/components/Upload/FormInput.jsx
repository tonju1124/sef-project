export default function FormInput({
  label,
  value,
  onChange,
  placeholder,
  hasError
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <h1 className="text-2xl">{label}</h1>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={`border-2 py-2 px-3 rounded-md w-full transition-all duration-300 outline-none ${
          hasError
            ? "border-red-500 placeholder-red-500 hover:border-red-500 hover:bg-gray-100 focus:border-red-500 focus:bg-gray-100 focus:shadow-md"
            : "border-gray-300 hover:border-gray-400 hover:bg-gray-100 focus:border-gray-400 focus:bg-gray-100 focus:shadow-md"
        }`}
        placeholder={placeholder}
      />
    </div>
  );
}
