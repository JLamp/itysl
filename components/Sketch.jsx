import styles from "../styles/Sketch.module.css";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import copyIcon from "../public/images/link-icon.svg";
import { useState, useEffect } from "react";

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

  const toast = <span className={styles.toast}>Copied!</span>;

  function showToast() {
    toast.style.display = "block";
  }

  const [clicked, setClicked] = useState(false);

  // useEffect(() => {
  //   if (clicked) {
  //     let timer = setTimeout(setClicked(!clicked), 3000);
  //     return clearTimeout(timer);
  //   } else {
  //   }
  // });

  const metaData = (
    <span className={styles.metaText}>
      Sn. {props.season} <span className={styles.bar}>|</span> Ep.{" "}
      {props.episode} <span className={styles.bar}>|</span> {timeStamp}
    </span>
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
    <div className={styles.card}>
      <a
        className={styles.header}
        href={props.link}
        rel="noreferrer"
        target="_blank"
      >
        <Image
          className={styles.image}
          src={coverImage}
          layout="fill"
          objectFit="cover"
          lazyBoundary="400px"
        />
      </a>
      <div className={styles.sketchInfoContainer}>
        <div className={styles.sketchInfo}>
          <a
            className={styles.title}
            href={props.link}
            rel="noreferrer"
            target="_blank"
          >
            {props.title}
          </a>
          <CopyToClipboard text={props.link} onClick={showToast}>
            <div className={styles.metadata}>
              <div className={styles.copyIcon}>
                <Image src={copyIcon} layout="fill" />
              </div>

              {text}
            </div>
          </CopyToClipboard>
        </div>
        <CopyToClipboard text={props.link} onClick={showToast}>
          <button className={styles.copyIconMobile}>
            <Image src={copyIcon} layout="fill" />
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
}
