import { Client } from "@notionhq/client";
import { Header } from "../components/Header";
import { SketchList } from "../components/SketchList";
import styles from "../styles/Home.module.css";

export default function Home({ sketches }) {
  function randomEp() {
    var min = Math.ceil(0);
    var max = Math.floor(sketches.length);
    var ep = Math.floor(Math.random() * (max - min) + min);
    window.open(sketches[ep].properties.Link["url"]);
  }
  return (
    <div className={styles.container}>
      <Header link={randomEp} />
      <SketchList sketches={sketches} />
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
