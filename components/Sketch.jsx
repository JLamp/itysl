import styles from "../styles/Sketch.module.css";
import Image from "next/image";

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

  function getTime() {
    var time = parseInt(props.link.split("=").pop());
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    var timeStamp = minutes.toString() + ":" + seconds.toString();
    console.log(timeStamp);
    return timeStamp;
  }
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
      <div style={{ padding: "12px" }}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.metadata}>
          Sn. {props.season} <span>|</span> Ep. {props.episode} <span>|</span>{" "}
          {timeStamp}
        </div>
      </div>
    </a>
  );
}
