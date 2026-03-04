"use client";

import { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
import { Document, Page } from "react-pdf";
import styles from "../../styles/sip.module.css";
// import { pdfjs } from 'react-pdf'

const DocumentViewer = dynamic(
  () => import("../../../../components/DocumentViewer"),
  { ssr: false, loading: () => <p>Loading document...</p> }
);

const SIPPage: NextPage = () => {
  const [documentError, setDocumentError] = React.useState<string | null>(null);
  const [numPages, setNumPages] = React.useState<number | null>(null);
  const [pageNumber, setPageNumber] = React.useState<number>(1);

  return (
    <>
      <Head>
        <title>Levi Terry - SIP</title>
        <meta name="description" content="Levi Terry's SIP page" />
      </Head>

      <br />

      <h1>SIP</h1>
      <h2>Project Name: Directional Alarm Clock</h2>

      <br />
      {/* display: "flex", flexDirection: 'row', alignContent: 'center', margin: '0 auto', width: '100%', flexWrap: 'wrap' */}
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <h2>Innovation Claim</h2>
          <p className={styles.hangingIndent}>
            The Directional Alarm Clock is a user-specific method of alerting
            users with the use of an ultrasound speaker to direct the alarm
            towards the specific sleeper who needs to be woken up without
            disturbing other sleepers nearby.
          </p>
        </div>

        <div className={styles.divider} />

        <div className={styles.gridItem}>
          <h2>Project Description</h2>
          <p className={styles.hangingIndent}>
            This alarm clock will use an ultrasound speaker for directional
            audio to target a specific person, so only the person using the
            alarm will be awoken. Along with directional audio, the clock will
            require the completion of a task to disable the alarm clock to
            activate the brain and get the user ready for the day.
          </p>
        </div>
      </div>

      <br />

      <h2>Pitch</h2>
      <DocumentViewer url="https://uatedu-my.sharepoint.com/:p:/g/personal/lterry80052_uat_edu/EQ3RNNma3RNNuQTws-xXR2UBVOBKst5CVeTGrpw6-TpUNg?e=mtLhL9" />

      {/* <DocumentViewer url="/docs/SIP311_Pitch_Directional_Alarm_Clock.pdf" /> */}
    </>
  );
};

export default SIPPage;
