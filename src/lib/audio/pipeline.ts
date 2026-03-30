import { pipeline } from "stream/promises";
import fs from "fs";
import { decodeToPCM } from "./ffmpeg";
import { createUltrasonicModulator } from "./modulator";

export async function processAudio(
  input: NodeJS.ReadableStream,
  outputPath: string
) {
  const pcmStream = decodeToPCM(input);
  const modulator = createUltrasonicModulator();
  const out = fs.createWriteStream(outputPath);

  await pipeline(pcmStream, modulator, out);
}
