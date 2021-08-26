import styles from "../styles/Sketch.module.css";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import copyIcon from "../public/images/link-icon.svg";

export function Sketch(props) {
  const coverImage = "/images/covers/" + props.image + ".jpg";

  function makeTimeStamp() {
    var timeInt = parseInt(props.link.split("=").pop());
    var minutes = Math.floor(timeInt / 60);
    var seconds = timeInt - minutes * 60;
    if (minutes < 10) {
      minutes = "0" + minutes.toString();
    } else {
      minutes = minutes.toString();
    }
    if (seconds < 10) {
      seconds = "0" + seconds.toString();
    } else {
      seconds = seconds.toString();
    }
    var timeStamp = minutes + ":" + seconds;
    return timeStamp;
  }
  const timeStamp = makeTimeStamp();

  return (
    <div className={styles.card}>
      <a className={styles.header} href={props.link}>
        <Image
          className={styles.image}
          src={coverImage}
          layout="fill"
          objectFit="cover"
        />
      </a>
      <div className={styles.sketchInfo}>
        <a className={styles.title} href={props.link}>
          {props.title}
        </a>
        <div className={styles.metadata}>
          <a href={props.link}>
            Sn. {props.season} <span className={styles.bar}>|</span> Ep.{" "}
            {props.episode} <span className={styles.bar}>|</span> {timeStamp}
          </a>
          <CopyToClipboard text={props.link}>
            <button className={styles.button}>
              <Image
                className={styles.copyIcon}
                src={copyIcon}
                width={12}
                height={12}
              />
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}
