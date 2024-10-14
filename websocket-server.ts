import { serve } from "bun";
import { WebSocketServer, WebSocket, RawData } from "ws";
import { spawn, ChildProcess } from "child_process";
import path from "path";
import fs from "fs";

const PORT = 3000;

type TimeoutId = ReturnType<typeof setTimeout>;

interface AiProgram {
  id: number;
  name: string;
  language: string;
  filename: string;
}

const languageLookup: { [key: string]: string } = {
  ".py": "python",
  ".cpp": "cpp",
  ".c": "c",
  ".js": "javascript",
  ".ts": "typescript",
  ".java": "java",
  ".rb": "ruby",
  ".php": "php",
  ".go": "go",
  ".rs": "rust",
  ".swift": "swift",
  ".kt": "kotlin",
  ".cs": "csharp",
  ".hs": "haskell",
  ".ml": "ocaml",
  ".scala": "scala",
  ".lua": "lua",
  ".pl": "perl",
  ".r": "r",
  ".sh": "shell",
  ".sql": "sql",
};

function getAiPrograms(): AiProgram[] {
  const aiProgramsDir = path.join(process.cwd(), "ai_programs");
  try {
    const files = fs.readdirSync(aiProgramsDir);
    return files
      .filter((file) => !file.endsWith(".out"))
      .map((file, index) => {
        const ext = path.extname(file).toLowerCase();
        const name = path.basename(file, ext);
        const language = languageLookup[ext] || "unknown";
        return {
          id: index + 1,
          name: name
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          language,
          filename: file,
        };
      });
  } catch (error) {
    console.error("Error reading ai_programs directory:", error);
    return [];
  }
}

const aiPrograms = getAiPrograms();

let currentChild: ChildProcess | null = null;
let programTimeout: TimeoutId | null = null;

function runProgram(program: AiProgram, ws: WebSocket): void {
  console.log("Running program:", program.name);
  const filePath = path.join(process.cwd(), "ai_programs", program.filename);

  if (!fs.existsSync(filePath)) {
    ws.send(
      JSON.stringify({
        type: "error",
        id: program.id,
        content: `File not found: ${program.filename}`,
      })
    );
    return;
  }

  let command: string;
  let args: string[];

  if (program.language === "python") {
    command = "python3";
    args = [filePath];
    runCommand(command, args, program, ws);
  } else if (program.language === "cpp") {
    const outputDir = path.join(process.cwd(), "compiled_programs");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    const outputFile = path.join(
      outputDir,
      `${path.basename(program.filename, ".cpp")}.out`
    );
    // Compile first
    spawn("g++", [filePath, "-o", outputFile]).on("close", (status: number) => {
      if (status !== 0) {
        ws.send(
          JSON.stringify({
            type: "output",
            id: program.id,
            content: `Compilation Error: Exit code ${status}`,
          })
        );
        return;
      }
      // Run the compiled program
      command = outputFile;
      args = [];
      runCommand(command, args, program, ws);
    });
  } else {
    ws.send(
      JSON.stringify({
        type: "output",
        id: program.id,
        content: "Unsupported language",
      })
    );
  }
}

function runCommand(
  command: string,
  args: string[],
  program: AiProgram,
  ws: WebSocket
): void {
  console.log("Executing command:", command, args.join(" "));
  currentChild = spawn(command, args);

  let output = "";
  let errorOutput = "";

  currentChild.stdout?.on("data", (data) => {
    output += data.toString();
    ws.send(
      JSON.stringify({
        type: "output",
        id: program.id,
        content: data.toString(),
      })
    );
  });

  currentChild.stderr?.on("data", (data) => {
    errorOutput += data.toString();
    ws.send(
      JSON.stringify({
        type: "output",
        id: program.id,
        content: `Error: ${data.toString()}`,
      })
    );
  });

  currentChild.on("close", (code, signal) => {
    console.log(`Child process exited with code ${code} and signal ${signal}`);
    if (programTimeout) clearTimeout(programTimeout);
    currentChild = null;

    let exitMessage = "Program finished. ";
    if (code !== 0 || signal) {
      exitMessage += `${code !== null ? `Exit code: ${code}.` : ""} ${
        signal ? `Signal: ${signal}.` : ""
      } `;
      if (signal === "SIGTERM") {
        exitMessage +=
          "The program was terminated, possibly due to timeout or manual interruption. ";
      }
    }
    exitMessage += errorOutput ? `Error: ${errorOutput}` : "";

    ws.send(
      JSON.stringify({
        type: "output",
        id: program.id,
        content: exitMessage,
      })
    );
    ws.send(JSON.stringify({ type: "programEnd", id: program.id }));
  });

  // Set a timeout to kill the process if it runs too long
  programTimeout = setTimeout(() => {
    if (currentChild && !currentChild.killed) {
      currentChild.kill("SIGTERM");
      ws.send(
        JSON.stringify({
          type: "output",
          id: program.id,
          content:
            "Program timed out after 2 minutes. You can restart it if needed.",
        })
      );
      ws.send(JSON.stringify({ type: "programEnd", id: program.id }));
    }
  }, 120000) as TimeoutId; // 2 minutes timeout
}

const wss = new WebSocketServer({ port: 8080 });
console.log(`WebSocket server is running on ws://localhost:8080`);

function validateInput(input: any): boolean {
  if (typeof input !== "object") return false;
  if (!input.type || typeof input.type !== "string") return false;
  if (input.type === "run" && (!input.id || typeof input.id !== "number"))
    return false;
  if (
    input.type === "input" &&
    (!input.content || typeof input.content !== "string")
  )
    return false;
  if (input.type === "terminate" && (!input.id || typeof input.id !== "number"))
    return false;
  return true;
}

wss.on("connection", (ws: WebSocket) => {
  console.log("New WebSocket connection established");
  ws.on("message", (message: RawData) => {
    console.log("Received message:", message.toString());
    try {
      const data = JSON.parse(message.toString());
      if (!validateInput(data)) {
        throw new Error("Invalid input");
      }

      if (data.type === "run") {
        console.log("Running program with ID:", data.id);
        const program = aiPrograms.find((p) => p.id === data.id);
        if (program) {
          if (currentChild && !currentChild.killed) {
            currentChild.kill("SIGTERM");
          }
          runProgram(program, ws);
        } else {
          console.log("Program not found:", data.id);
          ws.send(
            JSON.stringify({ type: "error", content: "Program not found" })
          );
        }
      } else if (data.type === "input") {
        console.log("Received input:", data.content);
        if (currentChild && !currentChild.killed) {
          currentChild.stdin?.write(data.content + "\n");
          console.log("Input sent to child process");
        } else {
          console.log("No active child process to receive input");
        }
      } else if (data.type === "terminate") {
        if (currentChild && !currentChild.killed) {
          currentChild.kill("SIGTERM");
          ws.send(
            JSON.stringify({
              type: "output",
              id: data.id,
              content: "Program terminated by user.",
            })
          );
          ws.send(JSON.stringify({ type: "programEnd", id: data.id }));
        }
      }
    } catch (error) {
      console.error("Error processing message:", error);
      ws.send(
        JSON.stringify({ type: "error", content: "Invalid message format" })
      );
    }
  });
});

const server = serve({
  port: PORT,
  fetch(req: Request) {
    const url = new URL(req.url);
    if (url.pathname === "/api/programs") {
      return new Response(JSON.stringify(aiPrograms), {
        headers: { "Content-Type": "application/json" },
      });
    }

    let filePath = path.join(process.cwd(), "public", url.pathname);
    if (url.pathname === "/") {
      filePath = path.join(process.cwd(), "public", "index.html");
    }

    const headers = new Headers({
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
    });
    if (fs.existsSync(filePath)) {
      const file = Bun.file(filePath);
      const contentType = getContentType(filePath);
      return new Response(file, {
        headers: { ...headers, "Content-Type": contentType },
      });
    }

    return new Response("Not Found", { status: 404, headers });
  },
});

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".html":
      return "text/html";
    case ".js":
      return "text/javascript";
    case ".ts":
      return "application/javascript";
    case ".css":
      return "text/css";
    case ".json":
      return "application/json";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    default:
      return "text/plain";
  }
}

console.log(`Server is running on http://localhost:${PORT}`);
