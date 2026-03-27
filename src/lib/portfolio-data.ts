import z from "zod";
import { ProjectsSchema } from "./projects.schema";

export type IncomingProjectsSchema = z.infer<typeof ProjectsSchema>;

export async function getPortfolioData(): Promise<
  IncomingProjectsSchema | undefined
> {
  const res = await fetch(
    "https://cdn.jsdelivr.net/gh/Typcial-Username/portfolio-data@main/dist/projects.json",
    {
      next: {
        revalidate: 60 * 60 * 24,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch projects: ${res.status}`);
  }

  const text = await res.text();

  try {
    const data = JSON.parse(text);
    const valid = validateProjects(data);

    if (valid) {
      return data as IncomingProjectsSchema;
    } else {
      return undefined;
    }
  } catch {
    console.error("Response was not JSON:", text);
  }
}

function validateProjects(schema: any) {
  if (!ProjectsSchema.safeParse(schema)) {
    return false;
  }

  return true;
}
