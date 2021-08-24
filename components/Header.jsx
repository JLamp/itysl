import styles from "../styles/Header.module.css";

export function Header(props) {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>I Think You Should Leave</div>
      <button className={styles.button} onClick={props.link}>
        Random!
      </button>
    </div>
  );
}
