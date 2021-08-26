import styles from "../styles/Header.module.css";
import Image from "next/image";
import logo from "../public/images/logo.svg";

export function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src={logo} />
      </div>
    </div>
  );
}
