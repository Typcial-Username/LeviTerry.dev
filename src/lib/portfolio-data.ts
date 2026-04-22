import z from "zod";
import { ProjectsSchema } from "./projects.schema";
import fs from "node:fs";
import path from "node:path";

export type IncomingProjectsSchema = z.infer<typeof ProjectsSchema>;

export async function getPortfolioData() /*: Promise<
  IncomingProjectsSchema | undefined
>*/ {
  const filePath = path.relative(process.cwd(), "public/projects.json");

  if (!fs.existsSync(filePath)) {
    console.error("File does not exist");
  }

  const fileContent = fs.readFileSync(filePath);

  let data: IncomingProjectsSchema = JSON.parse(fileContent.toString());
  return data;
  // const res = await fetch(
  //   "https://raw.githubusercontent.com/Typcial-Username/portfolio-data/refs/heads/main/dist/projects.json"
  //   // {
  //   //   next: {
  //   //     revalidate: 60 * 60 * 24,
  //   //   },
  //   // }
  // );
  // if (!res.ok) {
  //   throw new Error(`Failed to fetch projects: ${res.status}`);
  // }
  // const text = await res.text();
  // try {
  //   const data = JSON.parse(text);
  //   const valid = validateProjects(data);
  //   if (valid) {
  //     return data as IncomingProjectsSchema;
  //   } else {
  //     return undefined;
  //   }
  // } catch {
  //   console.error("Response was not JSON:", text);
  // }
}

function validateProjects(schema: any) {
  if (!ProjectsSchema.safeParse(schema)) {
    return false;
  }

  return true;
}
