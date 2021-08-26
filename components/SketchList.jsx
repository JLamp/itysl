import { Sketch } from "../components/Sketch";
import styles from "../styles/Grid.module.css";
import { SectionHeader } from "../components/SectionHeader";
import { useState } from "react";

export function SketchList({ sketches, season }) {
  const [show, setshow] = useState(true);

  return (
    <div style={{ width: "100%" }}>
      <SectionHeader
        season={season}
        onClick={() => setshow(!show)}
      ></SectionHeader>
      <div className={styles.grid} style={{ display: show ? "grid" : "none" }}>
        {sketches
          .filter((sketch) => sketch.properties.Season["number"] === season)
          .map((sketch) => (
            <Sketch
              key={sketch.id}
              image={sketch.properties.Sketch["number"]}
              title={sketch.properties.Name.title[0]["plain_text"]}
              season={season}
              episode={sketch.properties.Episode["number"]}
              link={sketch.properties.Link["url"]}
            />
          ))}
      </div>
    </div>
  );
}
