import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import { Card } from "../components/Card";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { Menu } from "../components/Menu";

import { Link } from "../components/Link";
import { Sidebar } from "../components/Sidebar";

const date = new Date(Date.now());
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Levi Terry | Home</title>
        <link rel="icon" href="/images/favicon.ico" />
        <meta property="og:title" content="Levi Terry" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_us" />
      </Head>

      {/* Introduction */}
      {/* <div className="container"> */}
      <h1 style={{ textAlign: "center" }}>Welcome to my website</h1>

      <br />
      {/* </div> */}
      {/* <section className="container"> */}
      <p>
        Developer
        {/* Hello, I&apos;m Levi Terry, I am a software developer based in Southern
        Nevada. I first started programming in 2012 when I discovered the
        language/program known as
        <Link href="https://scratch.mit.edu" target="_blank" text="Scratch" />.
        Soon after I fell in love with programming and have since then taken
        several classes in Computer Science and have self-taught myself
        utilizing numerous online resources such as{" "}
        <Link href="https://youtube.com" target="_blank" text="YouTube" />. I
        have used several languages including but limited to HTML, CSS,
        JavaScript, and Java */}
      </p>

      <br />
      {/* </section> */}

      {/* Projects */}
      {/* <section className="container"> */}

      {/* </section> */}

      <br />

      {/* <div className={styles.wave}></div> */}

      {/* Experience */}
      {/* <section className="container"> */}
      <h2 id="experience">Experience</h2>
      <div className={styles.grid}>
        <Card
          title="Code Ninjas - Code Sensei"
          description={`March 2022 - August 2023
          •Assisted children ages 5-14 in learning to code
          •Helped instruct programming concepts to children.
          •Helped debug programs created by students
          •Taught various languages to students including Scratch, JavaScript, Lua, and C Sharp with Unity`}
          link="https://codeninjas.com/"
          imageOptions={{
            src: "https://www.codeninjas.com/hubfs/Group%201.svg",
            location: "left",
            alt: "Code Ninjas Logo",
          }}
        />
      </div>
      {/* </section> */}

      <br />

      {/* Contact */}
      {/* <section className="container"> */}
      {/* <div className={styles.contact}>
      </div> */}

      <div className={styles.typing}>
        <div className={styles.blinker}></div>
        {" " + days[date.getDay()]}!
      </div>
      <a
        href="https://github.com/Typcial-Username/LeviTerry.dev"
        target="_blank"
        rel="noreferrer"
      >
        View Source
      </a>
      {/* </section> */}
    </>
  );
};

const onContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log(event.target);
};
export default Home;
