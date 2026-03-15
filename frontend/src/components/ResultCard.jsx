

const ResultCard = ({result, index}) => {
    const borderColor = () => {
        if (index === 0) return "border-red-400 bg-red-50";
        if (index === 1) return "border-yellow-400 bg-yellow-50";
        return "border-blue-400 bg-blue-50";
    };



    const badgeColor = () => {
        if (index === 0) return "bg-red 500";
        if (index === 1) return "bg-yellow-500";
        return "bg-blue-500"
    };

    const barColor = () => {
        if (index === 0) return "bg-red-500";
        if (index === 1) return "bg-yellow-500";
        return "bg-blue-500";
    };


    const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : " 🥉";


    return (
        <div className={`border-2 rounded-2xl p-5 shadow-sm ${borderColor()}`}>

           <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-800">
                 {medal} {result.disease}
            </h3>
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${badgeColor()}`}>
                {result.confidence}%
            </span>
           </div>


           <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
            className={`h-2 rounded-full ${barColor()}`}
            style={{ width: `${result.confidence}%` }}
             />
           </div>


           <p className="text-gray-600 text-sm mb-3">{result.description}</p>


           <div>
            <p className="font-semibold text-gray-700 mb-2">⚠️ Precautions:</p>
            <ul className="space-y-1">
                {result.precautions.map((p, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">

                        <span className="text-green-500 font-bold">{i + 1}.</span> {p}
                        
                    </li>
                ))}
            </ul>
           </div>


        </div>
    )

}


export default ResultCard;