/**
 * SubmitButton Component
 * 
 * The submit button for the publication upload form.
 * Positioned at the bottom-right of the form.
 */
export default function SubmitButton({ onClick }) {
  return (
    <div className="flex justify-end w-[95%]">
      <p
        onClick={onClick}
        className="text-white border bg-black rounded-md py-1.5 px-4 font-semibold hover:bg-gray-800 hover:border-black focus:bg-gray-800 focus:border-black focus:shadow-md transition-all duration-300 cursor-pointer outline-none"
      >
        Submit
      </p>
    </div>
  );
}
