import { NextPage } from "next";
import { Card } from "../components/Card";
import Head from "next/head";

const Gallery: NextPage = () => {
  return (
    <>
      <Head>
        <title>Levi Terry&apos;s Developer Portfolio | Gallery</title>
      </Head>

      <div>
        <h1>Gallery</h1>

        <br />

        <div
          className={`grid`}
          style={{ margin: "0 5% 0 5%", gridTemplateColumns: "repeat(4, 1fr)" }}
        >
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
        </div>
      </div>
    </>
  );
};

export default Gallery;
