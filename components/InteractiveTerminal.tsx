// components/InteractiveTerminal.tsx
import React, { useState } from "react";

interface InteractiveTerminalProps {
  programId: string;
}

const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  programId,
}) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/programs/${programId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command: input }),
      });
      const data = await response.json();
      setOutput((prevOutput) => [...prevOutput, `> ${input}`, data.output]);
      setInput("");
    } catch (error) {
      setOutput((prevOutput) => [
        ...prevOutput,
        `> ${input}`,
        "Error executing command",
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="terminal">
      <div className="output">
        {output.map((line, index) => (
          <pre key={index}>{line}</pre>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          disabled={loading}
          placeholder="Enter command"
        />
        <button type="submit" disabled={loading}>
          Run
        </button>
      </form>
      <style jsx>{`
        .terminal {
          background: #000;
          color: #fff;
          padding: 1rem;
          border-radius: 5px;
        }
        .output {
          max-height: 300px;
          overflow-y: auto;
          margin-bottom: 1rem;
        }
        input {
          width: calc(100% - 60px);
          padding: 0.5rem;
          margin-right: 0.5rem;
        }
        button {
          padding: 0.5rem 1rem;
        }
      `}</style>
    </div>
  );
};

export default InteractiveTerminal;
