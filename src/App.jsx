import { Sparkles } from "lucide-react";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { motion } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    if (!prompt) return;

    try {
      setLoading(true);

      const result = await model.generateContent(
        `You are an AI productivity assistant. 
        Create a personalized study/work plan for:
        ${prompt}
        
        Include:
        - schedule
        - productivity tips
        - motivation
        - prioritization`
      );

      setResponse(result.response.text());
    } catch (error) {
      console.error(error);
      setResponse("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500 opacity-20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500 opacity-20 blur-[120px] rounded-full"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-4"
        >
          AI StudyFlow
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 text-lg mb-10 text-center max-w-2xl"
        >
          Your futuristic AI productivity and study planning assistant.
        </motion.p>

        {/* Input Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-3xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl"
        >
          <textarea
            rows="5"
            placeholder="Enter your goals, exams, deadlines, or productivity tasks..."
            className="w-full bg-transparent outline-none text-white placeholder-gray-400 resize-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button
  onClick={generatePlan}
  className="mt-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition-all duration-300 font-semibold shadow-lg flex items-center gap-2"
>
  <Sparkles size={18} />

  {loading ? "Generating..." : "Generate AI Plan"}
</button>
        </motion.div>

        {/* Response */}
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 w-full max-w-3xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 whitespace-pre-wrap text-gray-200 shadow-2xl"
          >
            {response}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;