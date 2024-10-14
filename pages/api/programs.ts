import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

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

interface AiProgram {
  id: number;
  name: string;
  language: string;
  filename: string;
}

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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const aiProgramsDir = path.join(process.cwd(), "ai_programs");
  console.log("AI Programs Directory:", aiProgramsDir);

  try {
    const files = fs.readdirSync(aiProgramsDir);
    res.status(200).json(files);
  } catch (error) {
    console.error("Error reading ai_programs directory:", error);
    res.status(500).json({ error: "Error fetching programs" });
  }
}
