import type { NextPage, Metadata } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getPortfolioData } from "../lib/portfolio-data";

export const metadata: Metadata = {
  title: "Levi Terry's Developer Portfolio | Home",
  openGraph: {
    title: "Levi Terry",
    type: "website",
    locale: "en_us",
  },
};

const Home = async () => {
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
        <link rel="icon" href="/images/headshot.jpg" />
      </Head>

      {/* Introduction */}
      <h1 style={{ textAlign: "center" }}>Welcome to my Portfolio!</h1>

      <br />

      <p>Levi Terry, Developer</p>

      <br />
      <br />

      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          margin: "0 2.5rem 2.5rem",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div style={{ placeSelf: "center" }}>
          <p className={styles.text}>
            Hello. I&apos;m Levi Terry, a student at the University of Advancing
            Technology in Tempe, Arizona. I am currently studying for a dual
            Bachelor of Science major in Robotics and Embedded Systems and
            Digital Maker and Fabrication. A deep passion for Robotics fuels me,
            and I am always looking for new ways to learn and grow in
            technology.
          </p>
        </div>

        <div className={styles.image_container}>
          <Image
            src="/images/headshot.jpg"
            width={150}
            height={150}
            alt="Headshot Image"
            className={styles.image}
            priority
          />
        </div>

        <div style={{ placeSelf: "center" }}>
          <p className={styles.text}>
            Eager to explore the endless possibilities of technology, I aspire
            to carve my path towards a career that merges innovation and
            practicality. I am always looking for new opportunities to learn and
            grow in the field of technology. When I&apos;m not emersed in the
            world of tech, you&apos;ll likely find me out in nature seeking
            solace or inspiration in the beauty of the outdoors.
          </p>
        </div>
      </div>

      <br />

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
    </>
  );
};

export default Home;
