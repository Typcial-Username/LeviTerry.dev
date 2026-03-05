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

    // Grab the form and find the file
    const form = event.currentTarget;
    const fileInput = form.elements.namedItem("file") as HTMLFormElement;
    const file = fileInput.files?.[0];

    const frequencyInput = form.elements.namedItem(
      "frequency"
    ) as HTMLInputElement;
    const frequency = parseFloat(frequencyInput.value);

    if (!file) {
      console.error("No file selected");
      setError("Error: Please select a file to process.");
      setLoading(false);
      return;
    }

    // Prepare the form data to send
    const formData = new FormData();
    formData.append("file", file);
    formData.append("frequency", frequency.toString());

    if (isNaN(frequency)) {
      console.error("Invalid frequency value");
      setError("Error: Please enter a valid frequency.");
      setLoading(false);
      return;
    }
    console.log("Form Data:", formData);
    const response = await fetch("/api/modulate-audio", {
      method: "POST",
      body: formData,
    });

    const resP = document.getElementById("response");
    if (!resP) {
      console.error("Response element not found");
      return;
    }

    if (response.ok) {
      const data = await response.json();

      // const audio = new Audio(data.modulatedPath);
      // audio.controls = true; // Add controls to the audio player

      // const audioContainer = document.createElement('div');
      // audioContainer.appendChild(audio);
      // resP.appendChild(audioContainer);

      resP.append(document.createElement("br"));

      // Add a download button
      const downloadButton = document.createElement("a");
      downloadButton.href = data.modulatedPath;
      downloadButton.download = data.modulatedPath; // Set the filename for download
      downloadButton.textContent = "Download Modulated Audio";
      downloadButton.style.display = "block"; // Make it a block element

      resP.appendChild(downloadButton);

      resP.append(document.createElement("hr")); // Add a horizontal rule for separation
      setLoading(false);
    } else {
      const errorData = await response.json();
      resP.textContent = `Error: ${errorData.error || "Unknown error"}`;
    }
  }
};

export default SoundModulator;
