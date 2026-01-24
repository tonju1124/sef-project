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
        className={`border-2 py-2 px-3 rounded-md w-[95%] hover:bg-gray-100 transition-all duration-200 ${
          hasError
            ? "border-red-500 placeholder-red-500"
            : "border-gray-300"
        }`}
        placeholder={placeholder}
      />
    </div>
  );
}
