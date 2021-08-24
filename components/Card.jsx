import styles from "../styles/Card.module.css";

export function Sketch(props) {
  const BackgroundImage = {
    backgroundImage: "url(" + props.image + ")",
  };
  return (
    <a className={styles.card} href={props.onClick}>
      <div className={styles.header} style={BackgroundImage} />
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
