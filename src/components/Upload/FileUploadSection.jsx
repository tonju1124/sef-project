import plusIcon from '../../assets/plus.svg';

export default function FileUploadSection({
  title,
  buttonLabel,
  files,
  hasError,
  onButtonClick,
  onFileRemove,
  inputId
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <h1 className="text-2xl">{title}</h1>
      {files.length === 0 && (
        <button
          onClick={onButtonClick}
          className={`bg-white text-black border-2 rounded-md py-1.5 px-6 w-fit hover:bg-gray-100 transition-all duration-200 cursor-pointer flex items-center gap-2 opacity-100 ${
            hasError
              ? "border-red-500"
              : "border-black"
          }`}
          style={{
            animation: "fadeIn 0.3s ease-out"
          }}
        >
          <img src={plusIcon} alt="Plus icon" className="w-2.5 h-2.5" />
          {buttonLabel}
        </button>
      )}
      {files.length > 0 && (
        <div className="mt-2 flex flex-col gap-1 w-[95%] opacity-100" style={{
          animation: "fadeIn 0.3s ease-out"
        }}>
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
              <span className="text-sm truncate">{file.name}</span>
              <button
                onClick={() => onFileRemove(index)}
                className="ml-2 text-red-500 hover:text-red-700 font-bold"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
