const SymptomSelector = ({
  symptoms,
  selected,
  onToggle,
  search,
  onSearch,
}) => {
  const filtered = symptoms.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-700 mb-4">
        🤒 Select Your Symptoms
      </h2>

      <input
        type="text"
        placeholder="🔍 Search symptoms..."
        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-blue-400 text-gray-700"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selected.map((s) => (
            <span
              key={s}
              onClick={() => onToggle(s)}
              className="bg-blue-500 text-white px-3 py-1 rounded-full cursor-pointer hover:bg-blue-600"
            >
              {s} x
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-64 overflow-y-auto pr-1">
        {filtered.map((symptom) => (
          <button
            key={symptom}
            onClick={() => onToggle(symptom)}
            className={`text-left px-3 py-2 rounded-xl text-sm border-2 transition-all ${
              selected.includes(symptom)
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300"
            }`}
          >
            {symptom.replace(/_/g, " ")}
          </button>
        ))}
      </div>
      <p className="text-gray-400 text-sm mt-3">
        {selected.length} symptom(s) selected
      </p>
    </div>
  );
};



export default SymptomSelector;