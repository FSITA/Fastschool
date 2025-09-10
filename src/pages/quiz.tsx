import { useState } from "react";
import SourceForm from "../components/SourceForm";

export default function QuizPage() {
  const [loading, setLoading] = useState(false);
  const [quizResult, setQuizResult] = useState<string | null>(null);

  // Handle form submit
  const handleFormSubmit = async (formData: {
    sourceType: string;
    sourceValue: string;
    difficulty: string;
  }) => {
    console.log("Form Data:", formData);

    // Only handle Topic/Text for now
    if (formData.sourceType !== "Topic/Text") {
      alert("Only Topic/Text works for now!");
      return;
    }

    setLoading(true);
    setQuizResult(null);

    try {
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setQuizResult(data.result);
    } catch (error) {
      console.error("Error generating quiz:", error);
      setQuizResult("❌ Failed to generate quiz. Check console for details.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📝 Quiz AI</h1>
      <p>Generate quizzes based on your topic.</p>

      {/* Shared form */}
      <SourceForm onSubmit={handleFormSubmit} />

      {loading && <p>⏳ Generating quiz...</p>}

      {quizResult && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Generated Quiz</h2>
          <pre
            style={{
              background: "#f4f4f4",
              padding: "1rem",
              whiteSpace: "pre-wrap",
              borderRadius: "5px",
            }}
          >
            {quizResult}
          </pre>
        </div>
      )}
    </div>
  );
}
