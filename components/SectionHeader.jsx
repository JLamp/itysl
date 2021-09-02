import styles from "../styles/Header.module.css";

export function SectionHeader({ season }) {
  const HeaderText = "Season " + season;
  const seasonID = "season" + season.toString();
  const otherSeason = (season === 1 ? 2 : 1).toString();
  const otherSeasonID = "#season" + otherSeason;
  const arrow = season === 1 ? "↓" : "↑";
  return (
    <div className={styles.sectionContainer} id={seasonID}>
      <span>{HeaderText}</span>
      <a className={styles.jump} href={otherSeasonID}>
        {arrow} Jump to Season {otherSeason}
      </a>
    </div>
  );
}
