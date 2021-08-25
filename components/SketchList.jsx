import { Sketch } from "../components/Sketch";
import styles from "../styles/Grid.module.css";

export function SketchList({ sketches }) {
  return (
    <div className={styles.grid}>
      {sketches
        .filter((sketch) => sketch.properties.Season["number"] === 1 || 2)
        .map((sketch) => (
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
  );
}
