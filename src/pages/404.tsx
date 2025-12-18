import { GetStaticProps } from "next";
import Head from "next/head";
import Header from "../components/Header";

export default function New404() {
  return (
    <div className="container">
      <Head>
        <title>Levi Terry | 404</title>
      </Head>
      <h1>404</h1>
    </div>
  );
}

// export const getStaticProps : GetStaticProps = async (params) => {
//     console.log(params)
// }
