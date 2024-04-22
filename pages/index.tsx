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

const Home: NextPage = () => {
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
  
  return (
    <>
      <Head>
        <title>Levi Terry&apos;s Developer Portfolio | Home</title>
        <link rel="icon" href="/images/headshot.jpg" />
        <meta property="og:title" content="Levi Terry" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_us" />
      </Head>

      {/* Introduction */}
      <h1 style={{ textAlign: "center" }}>Welcome to my Website</h1>

      <br />

      <p>
        Levi Terry, Developer
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
      <br />

      {/* <div className={styles.wave}></div> */}

      {/* Experience */}
      {/* <section className="container"> */}
      {/* <h2 id="experience">Experience</h2>
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
      </div> */}

      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          margin: "0 2.5rem 2.5rem",
          justifyContent: "center",
          alignContent: 'center'
          // aspectRatio: "1",
        }}
      >
        <div style={{ placeSelf: 'center' }}>
          <p className={styles.text}>
            Hello, I&apos;m Levi Terry, A student at the University of Advancing Technology in Tempe, Arizona. I am currently studying for a Bachelor of Science in Technology Studies. I fueled by a deep passion of Robotics and Artificial Intelligence and I am always looking for new ways to learn and grow in the field of technology.
          </p>
        </div>

        <div className={styles.image_container}>
          <Image
            src="/images/headshot_cropped.jpg"
            width={150}
            height={150}
            alt="Headshot Image"
            className={styles.image}
          />
        </div>

        <div style={{ placeSelf: 'center' }}>
          <p className={styles.text}>
            Eager to explore the endless possibilities of technology, I aspire to carve my path towards a career that merges innovation and practicality. I am always looking for new opportunities to learn and grow in the field of technology. When I&apos;m not emersed in the world of tech, you&apos;ll likely find me out in nature seeking solace or inspiration in the beauty of the outdoors. 
          </p>
        </div>
      </div>

      <br />

        {/* <div className="container"> */}
        <div className="typing">
          <div className="blinker"></div>
          {" " + days[date.getDay()]}!
        </div>
        <a
          href="https://github.com/Typcial-Username/LeviTerry.dev"
          target="_blank"
          rel="noreferrer"
        >
          View Source
        </a>
        {/* </div> */}

      {/* Contact */}
      {/* <section className="container"> */}
      {/* <div className={styles.contact}>
      </div> */}
      {/* </section> */}
    </>
  );
};

export default Home;
