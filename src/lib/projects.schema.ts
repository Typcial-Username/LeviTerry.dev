import { z } from "zod";
import path from "node:path";
import fs from "node:fs";

//#region Constants
const RepoSlug = z.string().regex(/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/);
export const Objective = z.enum([
  "RES-1",
  "RES-2",
  "RES-3",
  "RES-4",
  "RES-5",
  "RES-6",

  "DMF-1",
  "DMF-2",
  "DMF-3",
  "DMF-4",
  "DMF-5",
  "DMF-6",
]);

export const ObjectiveEntry = z.object({
  code: Objective,
  reason: z.string().min(1),
});

const Objectives = z
  .array(ObjectiveEntry)
  .describe("The UAT degree objectives this project satisfies")
  .superRefine((arr, ctx) => {
    const codes = arr.map((o) => o.code);

    const duplicates = codes.filter((c, i) => codes.indexOf(c) !== i);

    if (duplicates.length) {
      ctx.addIssue({
        code: "custom",
        message: `Duplicate objective code: ${duplicates.join(", ")}`,
      });
    }
  });
  
const FILES_ROOT = path.resolve("docs");

const Status = z.enum(["complete", "in-progress", "prototype", "archived"]);

const ImagePath = z.string().regex(/\.(png|jpg|jpeg|webp)$/i);
const StlFilePath = z.string().regex(/\.stl$/i);
const CadFilePath = z.string().regex(/\.(f3d|f3z)$/i);

const Files = z
  .object({
    cad: z.array(CadFilePath).optional(),
    stl: z.array(StlFilePath).optional(),
  })
//#endregion

export const MediaSchema = z
  .object({
    images: z.array(ImagePath).optional(),
    videos: z.array(z.url()).optional(),
    docs: z.array(z.string()).optional(),
    modelViewer: z.url().optional(),
  })

export const ProjectSchema = z.object({
  id: z.string(),
  repo: RepoSlug.optional()
    .nullable()
    .describe("GitHub repoisitory in the owner/repo format"),

  title: z.string().describe("Project title shown on portfolio cards"),
  description: z.string().optional(),

  course: z.string().min(6).max(6).regex(/[A-Z]{3}[0-9]{3}/).optional().describe("Course this project was created for"),
  objectives: Objectives.optional(),

  media: MediaSchema.optional(),
  files: Files.optional(),

  status: Status.optional(),
  visibility: z.enum(["public", "private"]).optional(),
});

export const ProjectsSchema = z.object({
  projects: z.array(ProjectSchema),
});

export type Project = z.infer<typeof ProjectSchema>;