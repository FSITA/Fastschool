// src/pages/quiz.tsx
import { useState } from "react";
import SourceForm from "../components/SourceForm";

export default function QuizPage() {
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<string | null>(null);

  const handleFormSubmit = async (data: any) => {
    console.log("🔹 Form submitted with data:", data); // DEBUG 1
    setLoading(true);
    setQuiz(null);

    try {
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("🔹 API response status:", response.status); // DEBUG 2

      const result = await response.json();
      console.log("🔹 API response JSON:", result); // DEBUG 3

      setQuiz(result.quiz || "No quiz generated.");
    } catch (error) {
      console.error("❌ Error generating quiz:", error);
      setQuiz("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Quiz AI</h1>

      {!quiz && (
        <SourceForm onSubmit={handleFormSubmit} />
      )}

      {loading && <p className="mt-4 text-gray-600">Generating quiz...</p>}

      {quiz && (
        <div className="mt-6 w-full max-w-2xl bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Generated Quiz</h2>
          <pre className="whitespace-pre-wrap text-gray-800">{quiz}</pre>
          <button
            onClick={() => setQuiz(null)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Regenerate
          </button>
        </div>
      )}
    </main>
  );
}
