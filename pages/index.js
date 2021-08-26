import { Client } from "@notionhq/client";
import { Header } from "../components/Header";
import { SketchList } from "../components/SketchList";
import { RandomButton } from "../components/RandomButton"
import styles from "../styles/Home.module.css";
import Head from "next/head";

export default function Home({ sketches }) {
  function randomEp() {
    var min = Math.ceil(0);
    var max = Math.floor(sketches.length);
    var ep = Math.floor(Math.random() * (max - min) + min);
    window.open(sketches[ep].properties.Link["url"]);
  }
  return (
    <div>
    <Head>
      <title>I Think You Should Leave Db</title>
      <meta property="og:title" content="I Think You Should Leave Db" />
      <meta property="og:image" content="/images/meta-image.jpg" />
      <meta property="og:description" content="I think it's a good website, and I stand by it."/>
    </Head>
    <div className={styles.container}>
      <RandomButton sketches={sketches}/>
      <Header />
      <SketchList sketches={sketches} season={1}/>
      <SketchList sketches={sketches} season={2}/>
      <div className={styles.footer}>Site by <a href={"https://twitter.com/JLampron"}>lamp</a></div>
    </div>
    </div>
  );
}

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    sorts: [
      {
        property: "Sketch",
        direction: "ascending",
      },
    ],
  });
  return {
    props: {
      sketches: response.results,
    },
  };
}
