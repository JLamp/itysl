import styles from "../styles/Sketch.module.css";
import Image from "next/image";
import copyIcon from "../public/images/link-icon.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toastImage from "../public/images/toast-image.png";

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

  const toastImage = (
    <div className={styles.toastContent}>
      <div className={styles.toastImage}></div>
      <span>That&apos;ll copy realll nice!</span>
    </div>
  );

  const handleClick = () => {
    toast(({ closeToast }) => toastImage, {
      position: toast.POSITION.BOTTOM_LEFT,
      hideProgressBar: true,
      autoClose: 3000,
    });
  };

  return (
    <div className={styles.card}>
      <a
        className={styles.header}
        href={props.link}
        rel="noreferrer"
        target="_blank"
        tabIndex="-1"
      >
        <Image
          className={styles.image}
          src={coverImage}
          layout="fill"
          objectFit="cover"
          lazyBoundary="400px"
          alt=" "
        />
      </a>
      <div className={styles.sketchInfoContainer}>
        <div className={styles.sketchInfo}>
          <a
            className={styles.title}
            href={props.link}
            rel="noreferrer"
            target="_blank"
            aria-label="Open sketch in Netflix"
          >
            {props.title}
          </a>

          <span className={styles.metadata}>
            <a
              className={styles.metaText}
              href={props.link}
              rel="noreferrer"
              target="_blank"
              aria-label="Open sketch in Netflix"
            >
              Sn. {props.season} <span className={styles.bar}>|</span> Ep.{" "}
              {props.episode} <span className={styles.bar}>|</span> {timeStamp}
            </a>

            <CopyToClipboard text={props.link}>
              <div className={styles.copyText}>
                <button onClick={handleClick}>Copy Link</button>
              </div>
            </CopyToClipboard>
          </span>
        </div>
        <CopyToClipboard text={props.link}>
          <button className={styles.copyIconMobile} onClick={handleClick}>
            <Image src={copyIcon} layout="fill" />
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
}
