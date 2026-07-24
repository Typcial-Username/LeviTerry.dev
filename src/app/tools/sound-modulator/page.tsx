"use client";

import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";

const SoundModulator: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>Levi Terry&apos;s Developer Portfolio | Sound Modulator</title>
        <meta
          name="description"
          content="A sound modulator that allows you to process audio files."
        />
      </Head>

      <form onSubmit={submit}>
        <label htmlFor="file">File to process: </label>
        <br />
        <input name="file" id="file" type="file" accept=".mp3,.wav" />
        <br />
        <label htmlFor="frequency">Frequency (Hz): </label>
        <input
          type="number"
          name="frequency"
          id="frequency"
          defaultValue={40000}
        />
        <br />
        <label htmlFor="sample_rate">Sample Rate: </label>
        <input
          type="number"
          name="sample_rate"
          id="sample_rate"
          defaultValue={384000}
        />
        <br />
        <br />
        <button type="submit" disabled={loading}>
          Process Audio
        </button>
        <br />
        <br />

        <p className="error" style={{ color: "red", fontWeight: "bold" }}>
          {error}
        </p>

        {loading && <p>🔁 Processing...</p>}

        <div id="response"></div>
      </form>
    </>
  );

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const form = event.currentTarget;

      const formData = new FormData(form);

      const file = formData.get("file") as File | null;
      const frequency = Number(formData.get("frequency"));
      const sampleRate = Number(formData.get("sample_rate"));

      if (!file) {
        throw new Error("Please select a file.");
      }

      if (!Number.isFinite(frequency)) {
        throw new Error("Invalid frequency.");
      }

      if (!Number.isFinite(sampleRate)) {
        throw new Error("Invalid sample rate.");
      }

      const response = await fetch("/api/modulate-audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Server error");
      }

      // Pull the real filename from the header instead of hardcoding it
      const disposition = response.headers.get("Content-Disposition");
      const filenameMatch = disposition?.match(/filename="(.+?)"/);
      const filename = filenameMatch?.[1] ?? "modulated.uaf";

      // receive the binary .uaf file
      const blob = await response.blob();

      // create a download link
      const url = URL.createObjectURL(blob);
      console.log({ url });

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }
};

export default SoundModulator;
