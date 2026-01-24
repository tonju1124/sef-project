export default function DescriptionTextarea({
  description,
  onChange,
  hasError
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <h1 className="text-2xl">Please Enter Publication Description:</h1>
      <div className="relative w-[95%]">
        <textarea
          value={description}
          onChange={onChange}
          className={`border-2 py-2 px-3 rounded-md w-full hover:bg-gray-100 transition-all duration-200 resize-none h-20 ${
            hasError
              ? "border-red-500 placeholder-red-500"
              : "border-gray-300"
          }`}
          placeholder={hasError ? "Description is required" : "Enter Description"}
        />
        <span className="absolute bottom-2 right-3 text-xs text-gray-600 pointer-events-none">{description.length} / 1000</span>
      </div>
    </div>
  );
}
