import { Sketch } from "../components/Sketch";
import styles from "../styles/Header.module.css";

export function SectionHeader({ season }) {
  const HeaderText = "Season " + season;
  return <div className={styles.sectionContainer}>{HeaderText}</div>;
}
