// import ffmpeg from 'fluent-ffmpeg'
import { NextApiRequest, NextApiResponse } from "next";
import formidable from 'formidable'
import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegPath from "ffmpeg-static";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!ffmpegPath) {
        throw new Error('ffmpeg path not found');
    }

    ffmpeg.setFfmpegPath(ffmpegPath);
    const form = formidable({ keepExtensions: true })

    const { files } = await new Promise<{ fields: formidable.Fields, files: formidable.Files }>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else resolve({ fields, files })
        })
    });

    const file = files[0] || files.file; // Access the file from the parsed form data
        
    if (!file) {
        console.error('No file found in form data');
        return res.status(400).json({ error: 'No file found in form data' });
    }

    const realFile = file[0]

    if (!realFile || !realFile.filepath || !realFile.originalFilename) {
        console.error('Invalid file data:', realFile);
        return res.status(400).json({ error: 'Invalid file data' });
    }

    const inputPath = realFile.filepath

    const sanitizedBaseName = path.parse(realFile.originalFilename).name.replace(/[^a-z0-9]/gi, '_').toLowerCase()

    // Ensure the output file has a .wav extension
    const outputDir = path.join(process.cwd(), 'public', 'modulated');
    
    const outputFileName = sanitizedBaseName + '-modulated.uaf';
    const wavFileName = sanitizedBaseName + '.uaf';

    const wavPath = path.join(outputDir, wavFileName)//fs.mkdtempSync('modulated-') + '/' + realFile.originalFilename;
    const modulatedPath = path.join(outputDir, outputFileName)

    // Convert to WAV format using ffmpeg
    await new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .audioChannels(1)
            .audioFrequency(44100)
            .audioCodec('pcm_s16le')
            .format('wav')
            .on('end', resolve)
            .on('error', reject)
            // .on('start', (cmd) => console.log('FFmpeg command:', cmd))
            // .on('stderr', (stderr) => console.error('FFmpeg stderr:', stderr))
            .save(wavPath);
    })

    console.log("WAV conversion done")
    console.log("WAV file path:", wavPath)
    
    // Read PCM data from the WAV file
    const pcm = fs.readFileSync(wavPath);
    console.log("PCM data length:", pcm.length)

    // Modulate the audio data
    const finished = await modulateAudio(pcm)

    fs.writeFileSync(modulatedPath, new Uint8Array(finished));

    console.log("Modulated audio saved to:", modulatedPath)

    return res.status(200).json({ message: 'File received successfully', modulatedPath: `modulated/${outputFileName}` });
}

function modulateAudio(file:Buffer, carrierHz: number = 40000, sampleRate: number = 44100): Buffer {
    // Placeholder for audio modulation logic
    // You can use libraries like ffmpeg or any other audio processing library here
    const carrier = 2 * Math.PI * carrierHz / sampleRate
    const modulated = new Float32Array(file.length / 2); // Placeholder for modulated audio data

    for (let i = 0; i < modulated.length; i++) {
        const sample = file.readInt16LE( i * 2) / 32768; // Convert to float
        modulated[i] = sample * Math.sin(carrier * i); // Simple modulation example
    }

    // Example: return a dummy response for now
    const int16Data = new Int16Array(modulated.map(x => Math.round(x * 32767)));
    return Buffer.from(int16Data.buffer);
}

export const config = {
    api: {
        bodyParser: false
    }
}
