import React, { useState } from "react";

type SourceType = "pdf" | "youtube" | "wikipedia" | "text";
type Difficulty = "Primary" | "Secondary" | "College" | "University";

interface SourceFormProps {
  onSubmit: (data: {
    sourceType: SourceType;
    sourceValue: string;
    difficulty: Difficulty;
  }) => void;
}

const SourceForm: React.FC<SourceFormProps> = ({ onSubmit }) => {
  const [sourceType, setSourceType] = useState<SourceType>("text");
  const [sourceValue, setSourceValue] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("Primary");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ sourceType, sourceValue, difficulty });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      {/* Source Type Dropdown */}
      <label>
        Source Type:
        <select
          value={sourceType}
          onChange={(e) => setSourceType(e.target.value as SourceType)}
        >
          <option value="pdf">PDF</option>
          <option value="youtube">YouTube Link</option>
          <option value="wikipedia">Wikipedia Link</option>
          <option value="text">Topic / Text</option>
        </select>
      </label>

      {/* Conditional Input Field */}
      {sourceType === "text" && (
        <label>
          Enter Topic / Text:
          <textarea
            value={sourceValue}
            onChange={(e) => setSourceValue(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
            placeholder="Type your topic or text here..."
            required
          />
        </label>
      )}

      {/* Difficulty Dropdown */}
      <label>
        Difficulty:
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
        >
          <option value="Primary">Primary</option>
          <option value="Secondary">Secondary</option>
          <option value="College">College</option>
          <option value="University">University</option>
        </select>
      </label>

      {/* Submit Button */}
      <button type="submit">Generate</button>
    </form>
  );
};

export default SourceForm;
