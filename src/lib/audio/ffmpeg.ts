import { spawn } from "child_process";
import ffmpegPath from "ffmpeg-static";

export function decodeToPCM(input: NodeJS.ReadableStream) {
  const ffmpeg = spawn(ffmpegPath!, [
    "-i",
    "pipe:0",
    "-f",
    "s16le",
    "-acodec",
    "pcm_s16le",
    "-ac",
    "1",
    "-ar",
    "48000",
    "pipe:1",
  ]);

  input.pipe(ffmpeg.stdin);

  return ffmpeg.stdout;
}
