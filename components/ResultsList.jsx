import { Sketch } from "./Sketch";
import styles from "../styles/Grid.module.css";

export function ResultsList({ sketches }) {
  return (
    <div style={{ width: "100%" }}>
      <div className={styles.grid}>
        {sketches.map((sketch) => (
          <Sketch
            key={sketch.Title}
            image={sketch.Cover}
            title={sketch.Title}
            season={sketch.Season}
            episode={sketch.Episode}
            link={sketch.Link}
          />
        ))}
      </div>
    </div>
  );
}
