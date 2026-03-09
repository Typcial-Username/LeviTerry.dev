// import ffmpeg from 'fluent-ffmpeg'
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import path from "path";

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectVersionsCommand,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_API,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY as string,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!ffmpegPath) {
    throw new Error("ffmpeg path not found");
  }

  ffmpeg.setFfmpegPath(ffmpegPath);
  const form = formidable({ keepExtensions: true });

  const { files, fields } = await new Promise<{
    fields: formidable.Fields;
    files: formidable.Files;
  }>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

  const file = files[0] || files.file; // Access the file from the parsed form data
  const frequency = parseFloat(
    fields.frequency && fields.frequency.length > 0 ?
      (fields.frequency[0] as string)
    : ""
  );

  if (!file) {
    console.error("No file found in form data");
    return res.status(400).json({ error: "No file found in form data" });
  }

  const realFile = file[0];

  if (!realFile || !realFile.filepath || !realFile.originalFilename) {
    console.error("Invalid file data:", realFile);
    return res.status(400).json({ error: "Invalid file data" });
  }

  const inputPath = realFile.filepath;

  const sanitizedBaseName = path
    .parse(realFile.originalFilename)
    .name.replace(/[^a-z0-9]/gi, "_")
    .toLowerCase();

  // Ensure the output file has a .wav extension
  const outputDir = path.join(process.cwd(), "public", "modulated");

  const outputFileName = sanitizedBaseName + "-modulated.uaf";
  const wavFileName = sanitizedBaseName + ".uaf";

  const wavPath = path.join(outputDir, wavFileName); //fs.mkdtempSync('modulated-') + '/' + realFile.originalFilename;
  const modulatedPath = path.join(outputDir, outputFileName);

  // Convert to WAV format using ffmpeg
  await new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .audioChannels(1)
      .audioFrequency(96000)
      .audioCodec("pcm_s16le")
      .format("wav")
      .on("end", resolve)
      .on("error", reject)
      // .on('start', (cmd) => console.log('FFmpeg command:', cmd))
      // .on('stderr', (stderr) => console.error('FFmpeg stderr:', stderr))
      .save(wavPath);
  });

  console.log("WAV conversion done");
  console.log("WAV file path:", wavPath);

  // Read PCM data from the WAV file
  const pcm = fs.readFileSync(wavPath);
  const dataOffset = 44;
  const audio = pcm.subarray(dataOffset);

  // Modulate the audio data
  const finished = await modulateAudio(pcm, frequency);

  fs.writeFileSync(modulatedPath, new Uint8Array(finished));

  console.log("Modulated audio saved to:", modulatedPath);

  return res.status(200).json({
    message: "File received successfully",
    modulatedPath: `modulated/${outputFileName}`,
  });
}

function createUAFHeader(
  sampleRate: number,
  carrierHz: number,
  sampleCount: number
): Buffer {
  const header = Buffer.alloc(16);

  header.write("UAF1", 0);
  header.writeUInt32LE(sampleRate, 4);
  header.writeUInt32LE(carrierHz, 8);
  header.writeUInt32LE(sampleCount, 12);

  return header;
}

function modulateAudio(
  file: Buffer,
  carrierHz: number = 40000,
  sampleRate: number = 192000,
  depth: number = 0.8
): Buffer {
  const carrierStep = (2 * Math.PI * carrierHz) / sampleRate;

  const sampleCount = file.length / 2;
  const output = new Int16Array(sampleCount);

  for (let i = 0; i < sampleCount; i++) {
    // read PCM sample
    const sample = file.readInt16LE(i * 2) / 32768;

    // AM modulation with carrier
    const modulated =
      Math.sqrt(Math.max(0, 1 + depth * sample)) * Math.sin(carrierStep * i);

    // convert back to int16 with clipping
    const scaled = Math.round(modulated * 32767);
    output[i] = Math.max(-32768, Math.min(32767, scaled));
  }

  const header = createUAFHeader(sampleRate, carrierHz, sampleCount);
  const pcmBuffer = Buffer.from(
    output.buffer,
    output.byteOffset,
    output.byteLength
  );

  const result = new Uint8Array(header.length + pcmBuffer.length);

  result.set(header, 0);
  result.set(pcmBuffer, header.length);

  return result;
}

export const config = {
  api: {
    bodyParser: false,
  },
};
