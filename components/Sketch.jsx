import styles from "../styles/Sketch.module.css";
import Image from "next/image";

export function Sketch(props) {
  const coverImage = "/images/covers/" + props.image + ".jpg";
  return (
    <a className={styles.card} href={props.link}>
      <div className={styles.header}>
        <Image
          className={styles.image}
          src={coverImage}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div style={{ padding: "8px" }}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.metadata}>
          <span style={{ marginRight: "8px" }}>Season {props.season}</span>
          <span>Episode {props.episode}</span>
        </div>
      </div>
    </a>
  );
}
