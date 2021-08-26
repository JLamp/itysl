import styles from "../styles/Sketch.module.css";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import copyIcon from "../public/images/link-icon.svg";
import { useState, useEffect } from "react";

export function MetaData(props) {
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

  const [clicked, setClicked] = useState(false);

  // useEffect(() => {
  //   if (clicked) {
  //     let timer = setTimeout(setClicked(!clicked), 3000);
  //     return clearTimeout(timer);
  //   } else {
  //   }
  // });

  const metaData = (
    <a href={props.link} target="_blank">
      Sn. {props.season} <span className={styles.bar}>|</span> Ep.{" "}
      {props.episode} <span className={styles.bar}>|</span> {timeStamp}
    </a>
  );
  const notification = <span>Send it to your mother in law!</span>;

  var text = clicked ? notification : metaData;

  function makeText() {
    text = notification;
    return text;
  }

  function handleClick() {
    setClicked(!clicked);
  }

  return (
    <CopyToClipboard text={props.link}>
      <div className={styles.metadata}>
        {text}
        <button className={styles.button} onClick={handleClick}>
          <Image
            className={styles.copyIcon}
            src={copyIcon}
            width={12}
            height={12}
          />
        </button>
      </div>
    </CopyToClipboard>
  );
}
