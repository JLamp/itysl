import styles from "../styles/RandomButton.module.css";
import Image from "next/image";
import random from "../public/images/Random.png";

export function RandomButton({ sketches }) {
  function randomEp() {
    var min = Math.ceil(0);
    var max = Math.floor(sketches.length);
    var ep = Math.floor(Math.random() * (max - min) + min);
    window.open(sketches[ep].properties.Link["url"]);
    return ep;
  }
  return (
    <div>
      <button className={styles.randomButton} onClick={randomEp}>
        <Image
          className={styles.randomButton}
          src={random}
          alt="Random Episode Button"
          onClick={randomEp}
        />
      </button>
    </div>
  );
}
