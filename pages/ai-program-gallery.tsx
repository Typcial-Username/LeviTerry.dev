import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import styles from "../styles/AiProgramGallery.module.css";

interface AiProgram {
  id: number;
  name: string;
  language: string;
  filename: string;
}

export default function AIProgramGallery() {
  const [programs, setPrograms] = useState<AiProgram[]>([]);
  const [outputs, setOutputs] = useState<{ [key: number]: string[] }>({});
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [runningPrograms, setRunningPrograms] = useState<Set<number>>(
    new Set()
  );
  const inputRefs = useRef<{ [key: number]: HTMLInputElement }>({});

  useEffect(() => {
    fetchPrograms();
    const websocket = new WebSocket(`ws://${window.location.hostname}:8080`);
    setWs(websocket);

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "output") {
        setOutputs((prev) => ({
          ...prev,
          [data.id]: [...(prev[data.id] || []), data.content],
        }));
      } else if (data.type === "programEnd") {
        setRunningPrograms((prev) => {
          const newSet = new Set(prev);
          newSet.delete(data.id);
          return newSet;
        });
      }
    };

    return () => {
      websocket.close();
    };
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch("/api/programs");
      const data = await response.json();
      setPrograms(data);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  const runProgram = (id: number) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "run", id }));
      setOutputs((prev) => ({ ...prev, [id]: [] }));
      setRunningPrograms((prev) => new Set(prev).add(id));
    }
  };

  const sendInput = (id: number, input: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "input", id, content: input }));
      setOutputs((prev) => ({
        ...prev,
        [id]: [...(prev[id] || []), `> ${input}`],
      }));
    }
  };

  const terminateProgram = (id: number) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "terminate", id }));
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>AI Program Gallery</title>
      </Head>
      <h1 className={styles.title}>AI Program Gallery</h1>
      <div className={styles.programGallery}>
        {programs.map((program) => (
          <div key={program.id} className={styles.programCard}>
            <h2 className={styles.programName}>{program.name}</h2>
            <p className={styles.programLanguage}>
              Language: {program.language}
            </p>
            <button
              className={styles.runButton}
              onClick={() => runProgram(program.id)}
              disabled={runningPrograms.has(program.id)}
            >
              {runningPrograms.has(program.id) ? "Running..." : "Run Program"}
            </button>
            {runningPrograms.has(program.id) && (
              <button
                className={styles.terminateButton}
                onClick={() => terminateProgram(program.id)}
              >
                Terminate
              </button>
            )}
            <div className={styles.terminal}>
              {outputs[program.id]?.map((line, index) => (
                <div key={index} className={styles.terminalLine}>
                  {line}
                </div>
              ))}
            </div>
            <input
              type="text"
              className={styles.inputField}
              placeholder="Enter input"
              ref={(el) => {
                if (el) inputRefs.current[program.id] = el;
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  const input = inputRefs.current[program.id].value;
                  sendInput(program.id, input);
                  inputRefs.current[program.id].value = "";
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
