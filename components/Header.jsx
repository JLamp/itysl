import styles from "../styles/Header.module.css";
import Image from "next/image";
import logo from "../public/images/logo.svg";
import { Search } from "../components/Search";

export function Header({ sketches }) {
  return (
    <div className={styles.container}>
      <Image
        src={logo}
        priority={true}
        alt="I Think You Should Leave Database"
      />
      <Search sketches={sketches} />
    </div>
  );
}
