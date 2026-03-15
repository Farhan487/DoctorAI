
const AnalyzeButton = ({onClick, loading, disabled }) => {
    return (
        <button
        onClick={onClick}
        disabled={disabled || loading}
        className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 rounded-2xl text-xl font-bold shadow-lg hover:from-blue-600 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all mb-6" >
            {loading ? "🔄 Analyzing..." : "🔬 Analyze Symptoms"}
        </button>
    );
}

export default AnalyzeButton;