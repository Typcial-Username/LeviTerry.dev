import { Transform } from "stream";

export function createUltrasonicModulator() {
  return new Transform({
    transform(chunk, _, callback) {
      const input = new Int16Array(
        chunk.buffer,
        chunk.byteOffset,
        chunk.length / 2
      );

      const output = new Int16Array(input.length);

      for (let i = 0; i < input.length; i++) {
        const carrier = Math.sin(2 * Math.PI * 40000 * (i / 48000));
        output[i] = input[i] * carrier;
      }

      callback(null, Buffer.from(output.buffer));
    },
  });
}
