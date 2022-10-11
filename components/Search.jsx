import Fuse from "fuse.js";
import React, { useState } from "react";
import styles from "../styles/Search.module.css";
import { MobileSearch } from "../components/MobileSearch";
import { useWindowSize } from "../hooks/useWindowSize";
import { MakeTimeStamp } from "./MakeTimeStamp";
import { device } from "../constants/Devices";

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

export function Search({ sketches }) {
  const [query, updateQuery] = useState("");
  const [searchActive, updateSearchActive] = useState(false);

  const isMobile = useWindowSize().width < 768 ? true : false;

  function onSearch({ currentTarget }) {
    updateQuery(currentTarget.value);
  }

  function onSearchActive() {
    updateSearchActive(true);
  }

  const sketchArray = [];

  sketches.map((sketch) =>
    sketchArray.push({
      Cover: "/images/covers/" + sketch.slug + ".jpg",
      Title: " " + sketch.name,
      Season: sketch.season,
      Episode: sketch.episode,
      Timestamp: MakeTimeStamp(sketch.netflixLink),
      Link: sketch.netflixLink,
      Transcript: sketch.transcript,
    })
  );

  const fuse = new Fuse(sketchArray, {
    keys: ["Title", "Transcript"],
    includeScore: true,
    minMatchCharLength: 3,
    ignoreFieldNorm: true,
    ignoreLocation: true,
    threshold: 0.02,
  });

  const results = fuse.search(" " + query);

  const sketchResults = results.map((sketch) => sketch.item);

  const emptyResultContent = (
    <div className={styles.emptyResult}>
      All right you know what? This is dumb. Dump it. Trash it. This one&apos;s
      garbage.
    </div>
  );

  function handleBlur() {
    setTimeout(function() {
      updateQuery("");
      updateSearchActive(false);
    }, 130);
  }

  const Logo = (
    <div className={styles.logoContainer}>
      <div className={styles.logo}></div>
    </div>
  );

  return (
    <div className={styles.pageHeader} onBlur={handleBlur}>
      {Logo}
      {isMobile ? (
        <MobileSearch sketches={sketches} />
      ) : (
        <div className={styles.searchContainer}>
          <input
            className={styles.searchInput}
            type="search"
            value={query}
            onChange={onSearch}
            onFocus={onSearchActive}
            placeholder={"Search"}
            style={query.length > 0 ? { borderRadius: "4px 4px 0 0" } : null}
          />
          <div className={styles.resultsContainer}>
            <div
              className={styles.divider}
              style={query.length > 0 ? null : { display: "none" }}
            />
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
      )}
    </div>
  );
}
