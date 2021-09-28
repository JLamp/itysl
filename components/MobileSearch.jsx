import Fuse from "fuse.js";
import React, { useState } from "react";
import styles from "../styles/MobileSearch.module.css";
import Image from "next/image";
import clearIcon from "../public/images/cancel.svg";
import backIcon from "../public/images/back-icon.svg";
import { MakeTimeStamp } from "./MakeTimeStamp";

function Metadata({ season, episode, timestamp }) {
  const METADATA =
    season > 0 ? (
      <>
        Sn. {season} | Ep. {episode} | {timestamp}{" "}
      </>
    ) : (
      <>The Characters | {timestamp} </>
    );
  return <>{METADATA}</>;
}

export function MobileSearch({ sketches }) {
  const [query, updateQuery] = useState("");
  const [searchActive, updateSearchActive] = useState(false);

  function onSearch({ currentTarget }) {
    updateQuery(currentTarget.value);
  }

  const sketchArray = [];

  sketches.map((sketch) =>
    sketchArray.push({
      Cover:
        "/images/covers/" +
        sketch.properties.image.rich_text[0]["plain_text"] +
        ".jpg",
      Title: " " + sketch.properties.Name.title[0]["plain_text"],
      Season: sketch.properties.Season["number"],
      Episode: sketch.properties.Episode["number"],
      Timestamp: MakeTimeStamp(sketch.properties.Link["url"]),
      Link: sketch.properties.Link["url"],
      Transcript: sketch.properties.Transcript.rich_text[0]["plain_text"],
      AVRanking: sketch.properties.AVRanking["number"],
    })
  );

  const sortedArray = sketchArray.sort(function(a, b) {
    return a.AVRanking - b.AVRanking;
  });

  const fuse = new Fuse(sketchArray, {
    keys: ["Title", "Transcript"],
    includeScore: true,
    minMatchCharLength: 3,
    ignoreFieldNorm: true,
    ignoreLocation: true,
    threshold: 0.2,
  });

  const results = fuse.search(" " + query);

  console.log(results);

  const sketchResults =
    query.length > 0 ? results.map((sketch) => sketch.item) : sortedArray;

  const emptyResultContent = (
    <div className={styles.emptyResult}>
      All right you know what? This is dumb. Dump it. Trash it. This one&apos;s
      garbage.
    </div>
  );

  function clearSearch() {
    updateQuery("");
  }

  function handleHideShow() {
    searchActive ? updateSearchActive(false) : updateSearchActive(true);
  }

  const SearchButton = (
    <button className={styles.mobileSearchButton} onClick={handleHideShow} />
  );

  const MobileSearch = (
    <div className={styles.mobileSearchContainer}>
      <div className={styles.searchContainer}>
        <div className={styles.inputContainer}>
          <button className={styles.backButton} onClick={handleHideShow}>
            <Image src={backIcon} width={16} height={16} />
          </button>
          <input
            className={styles.searchInput}
            type="search"
            value={query}
            onChange={onSearch}
            placeholder={"Search"}
          />
          <button
            className={styles.clearButton}
            onClick={clearSearch}
            style={query.length > 0 ? null : { display: "none" }}
          >
            <Image src={clearIcon} width={16} height={16} />
          </button>
        </div>
        <div className={styles.resultsContainer}>
          <div className={styles.resultsList}>
            {sketchResults.map((sketch) => (
              <a
                key={sketch.Title}
                href={sketch.Link}
                className={styles.resultItem}
                rel="noreferrer"
                target="_blank"
              >
                <div
                  className={styles.resultImage}
                  style={{ backgroundImage: `url(${sketch.Cover})` }}
                ></div>
                <div className={styles.resultData}>
                  <div className={styles.resultTitle}>{sketch.Title}</div>
                  <div className={styles.resultMetadata}>
                    <Metadata
                      season={sketch.Season}
                      episode={sketch.Episode}
                      timestamp={sketch.Timestamp}
                    />
                  </div>
                </div>
              </a>
            ))}
            {query.length > 2 && results.length === 0
              ? emptyResultContent
              : null}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {SearchButton}
      {searchActive && MobileSearch}
    </div>
  );
}
