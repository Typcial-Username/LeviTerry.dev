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
        <title>Levi Terry&apos;s Developer Portfolio | Home</title>
        <link rel="icon" href="/images/favicon.ico" />
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

      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', margin: '0 5rem 2.5rem' }}>
        <div>
          <p className={styles.text}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate soluta adipisci sed neque laboriosam. Eos quidem, adipisci harum error aspernatur, quasi repudiandae fugiat esse praesentium doloremque, maiores dolores officiis deserunt. Vel eaque dolor, magni est ut eveniet beatae nisi aut unde consequuntur ducimus sequi quam suscipit. Esse praesentium neque alias expedita laboriosam consequatur quam eligendi sint magni ex. Iste modi incidunt earum quaerat, beatae deserunt rem numquam odit in doloribus nesciunt minus ipsa provident quos.</p>
        </div>

        <div className={styles.image_container}>
          <img src="https://via.placeholder.com/200" alt="Placeholder Image" style={{ borderRadius: '50%' }}/>
        </div>

        <div className={styles.text}>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias sed voluptates architecto deserunt debitis nostrum alias a, deleniti cupiditate cumque, quae dolores voluptas enim ipsa aliquid. Voluptate quos consectetur libero labore iusto. Deserunt minima architecto nesciunt voluptatum, dolor quod minus illo at autem soluta ducimus maiores aspernatur atque tenetur fugit velit perspiciatis? Odit velit nihil vero, corrupti ducimus exercitationem assumenda quibusdam doloremque reprehenderit. Voluptatem fuga mollitia dolorum iste neque exercitationem esse doloribus quis sit a?</p>
        </div>
      </div>

      <br />

      {/* Contact */}
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
    </>
  );
};

export default Home;
