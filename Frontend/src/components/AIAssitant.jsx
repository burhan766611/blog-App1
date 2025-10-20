import { useState } from "react";
import API from "../services/api";

const AIAssistant = ({ text, setText }) => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [type, setType] = useState("correction");
  const [tone, setTone] = useState("friendly");

  // let debounceTimer;

  const handleAI = async () => {
    if (!text) return alert("Please write some content first!");

    setLoading(true);
    setOutput("");

    try {
      const res = await API.post("/api/ai/assist", {
        text,
        type,
        tone,
      });
      setOutput(res.data.result);
    } catch (err) {
      console.log(err);
      setOutput("⚠️ Error: Unable to fetch AI suggestion");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   clearTimeout(debounceTimer);
  //   debounceTimer = setTimeout(() => {
  //     handleAI();
  //   }, 800); // 800ms after user stops typing

  //   return () => clearTimeout(debounceTimer);
  // }, [text, type, tone]);

  const applySuggestion = () => {
    if (output) {
      setText(output);
    }
  };

  return (
    <div className="p-4 bg-gray-50 border rounded-2xl shadow-sm mt-4 space-y-3">
      <h2 className="font-bold text-lg flex items-center gap-2">
        🤖 AI Writing Assistant
      </h2>

      <div className="flex flex-wrap gap-2">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="correction">Text Correction</option>
          <option value="improvement">Improvement Tips</option>
          <option value="summary">Summarize</option>
          <option value="seo">SEO Assistant</option>
          <option value="tone">Tone Rewriter</option>
        </select>

        {type === "tone" && (
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="friendly">Friendly</option>
            <option value="formal">Formal</option>
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
          </select>
        )}

        {/* Generate Button */}
        <button
          type="button" // <--- Important
          onClick={handleAI}
          disabled={loading}
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
        >
          {loading ? "Thinking..." : "Generate"}
        </button>
      </div>

      {/* Output Box */}
      {output && (
        <div className="mt-3 bg-white p-3 border rounded-lg space-y-2">
          <p className="text-sm whitespace-pre-wrap">{output}</p>

          {/* Apply Button */}
          <button
            type="button" // <--- Important!
            onClick={applySuggestion}
            className="mt-1 bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
          >
            Apply to Post
          </button>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
