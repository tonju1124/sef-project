export default function SubmitButton({ onClick }) {
  return (
    <div className="flex justify-end w-[95%]">
      <p
        onClick={onClick}
        className="text-black border-2 border-gray-300 rounded-md py-1.5 px-4 font-semibold hover:bg-gray-200 transition-all duration-200 cursor-pointer"
      >
        Submit
      </p>
    </div>
  );
}
