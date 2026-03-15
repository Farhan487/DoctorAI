import {useState, useEffect} from 'react';
import axios from "axios";
import Header from './components/Header';
import WarningBanner from './components/WarningBanner';
import SymptomSelector from './components/SymptomSelector';
import AnalyzeButton from './components/AnalyzeButton';
import ResultCard from './components/ResultCard';

const API_URL = "https://doctorai-v467.onrender.com";


const App = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [selected, setSelected] = useState([]);
  const [results, setResults] =  useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/symptoms`).then((res) => {
      setSymptoms(res.data.symptoms);
    });
  }, []);


  const toggleSymptom = (symptom) => {
    setSelected((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };


  const analyze = async () => {
    if (selected.length === 0) return;
    setLoading(true);
    setResults(null)
    try {
      const res = await axios.post(`${API_URL}/predict`, {
        symptoms: selected,
      });
      setResults(res.data.results);
    } catch (err){
      alert("Error connecting to the backend!")
    }
    setLoading(false);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">

      <Header />
      <WarningBanner />

      <div className="max-w-4xl mx-auto px-4 py-6">


        <SymptomSelector 
        symptoms={symptoms}
        selected={selected}
        onToggle={toggleSymptom}
        search={search}
        onSearch={setSearch}
        />


        <AnalyzeButton 
        onClick={analyze}
        loading={loading}
        disabled={selected.length === 0}
        />

        {results && (
          <div>
            <h2 className="text-xl font-bold text-gray-700 mb-4">🔬 Analysis Results</h2>
            <div className="space-y-4">
              {results.map((result, index) => (
              <ResultCard key={index} result={result} index={index} />
             ))}
            </div>


            <div className="mt-6 bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-center">
              <p className="text-red-600 font-semibold">
                🚨 This is NOT a medical diagnosis. Please visit a doctor
              </p>

            </div>
          </div>
        )};


      </div>
    </div>
  );


};

export default App;


