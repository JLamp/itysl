import { Client } from "@notionhq/client";
import { Sketch } from "../components/Card";
import { Header } from "../components/Header";
import styles from "../styles/Home.module.css";

export default function Home({ sketches }) {
  function randomEp() {
    var min = Math.ceil(0);
    var max = Math.floor(sketches.length);
    var ep = Math.floor(Math.random() * (max - min) + min);
    window.open(sketches[ep].properties.Link["url"]);
    return ep;
  }
  return (
    <div className={styles.container}>
      <Header link={randomEp} />
      <div className={styles.grid}>
        {sketches.map((sketch) => (
          <Sketch
            key={sketch.id}
            image={sketch.properties.Image["url"]}
            title={sketch.properties.Name.title[0]["plain_text"]}
            season={sketch.properties.Season["number"]}
            episode={sketch.properties.Episode["number"]}
            link={sketch.properties.Link["url"]}
          />
        ))}
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
