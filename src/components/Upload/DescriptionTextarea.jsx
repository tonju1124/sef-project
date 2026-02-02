export default function DescriptionTextarea({
  description,
  onChange,
  hasError
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <h1 className="text-xl">Please Enter Publication Description:</h1>
      <div className="relative w-full">
        <textarea
          value={description}
          onChange={onChange}
          className={`border-2 py-2 px-3 rounded-md w-full resize-none h-20 transition-all duration-300 outline-none ${
            hasError
              ? "border-red-500 placeholder-red-500 hover:border-red-500 hover:bg-gray-100 focus:border-red-500 focus:bg-gray-100 focus:shadow-md"
              : "border-gray-300 hover:border-gray-400 hover:bg-gray-100 focus:border-gray-400 focus:bg-gray-100 focus:shadow-md"
          }`}
          placeholder={hasError ? "Description is required" : "Enter Description"}
        />
        <span className="absolute bottom-2 right-3 text-xs text-gray-600 pointer-events-none">{description.length} / 1000</span>
      </div>
    </div>
  );
}
