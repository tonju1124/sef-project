import plusIcon from '../../assets/plus.svg';

export default function CoAuthorSection({
  coAuthorName,
  setCoAuthorName,
  showCoAuthorInput,
  setShowCoAuthorInput
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <h1 className="text-2xl">Co-author</h1>
      {showCoAuthorInput ? (
        <input
          type="text"
          value={coAuthorName}
          onChange={(e) => setCoAuthorName(e.target.value)}
          onBlur={() => {
            if (coAuthorName.trim() === "") {
              setShowCoAuthorInput(false);
            }
          }}
          className="border-2 border-black py-2 px-3 rounded-md w-[95%] hover:bg-gray-100 transition-all duration-300 opacity-100 scale-100"
          style={{
            animation: "fadeInScale 0.3s ease-out"
          }}
          placeholder="Enter Co-author Name"
          autoFocus
        />
      ) : (
        <button
          onClick={() => setShowCoAuthorInput(true)}
          className="bg-white text-black border-2 border-black rounded-md py-1.5 px-4 w-fit hover:bg-gray-100 transition-all duration-200 cursor-pointer flex items-center gap-2 opacity-100 scale-100"
          style={{
            animation: "fadeInScale 0.3s ease-out"
          }}
        >
          <img src={plusIcon} alt="Plus icon" className="w-3 h-3"/>
          Add Co-author
        </button>
      )}
    </div>
  );
}
