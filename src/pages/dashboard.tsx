export default function Dashboard() {
  const tools = [
    "Quiz AI",
    "Lesson AI",
    "Summary AI",
    "Presentation AI",
    "Flashcards AI",
    "Flowchart AI",
    "DSA Planner",
    "Activities AI",
    "Slides AI",
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        FastSchool Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <a
            key={tool}
            href={`/${tool.toLowerCase().replace(/\s+/g, "-")}`}
            className="p-6 bg-white rounded-xl shadow hover:shadow-lg hover:bg-blue-50"
          >
            <h2 className="text-xl font-semibold text-gray-800">{tool}</h2>
            <p className="text-gray-600 mt-2">Go to {tool}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
