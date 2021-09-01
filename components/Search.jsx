import { Client } from "@notionhq/client";
import Fuse from "fuse.js";
import React, { useState } from "react";
import styles from "../styles/Search.module.css";

export function Search({ sketches }) {
  const [query, updateQuery] = useState("");

  function onSearch({ currentTarget }) {
    updateQuery(currentTarget.value);
  }

  function makeTimeStamp(e) {
    var timeInt = parseInt(e.split("=").pop());
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
      Timestamp: makeTimeStamp(sketch.properties.Link["url"]),
      Link: sketch.properties.Link["url"],
      Transcript: sketch.properties.Transcript.rich_text[0]["plain_text"],
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

  var placeHolderText = "Search";

  const emptyResultContent = (
    <div className={styles.emptyResult}>
      All right you know what? This is dumb. Dump it. Trash it. This one's
      garbage.
    </div>
  );

  function handleBlur() {
    setTimeout(function () {
      updateQuery("");
    }, 150);
  }
  // console.log(sketchArray);

  return (
    <div className={styles.searchContainer} onBlur={handleBlur}>
      <input
        className={styles.searchInput}
        type="search"
        value={query}
        onChange={onSearch}
        placeholder={placeHolderText}
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
                  Sn. {sketch.Season} | Ep. {sketch.Episode} |{" "}
                  {sketch.Timestamp}
                </div>
              </div>
            </a>
          ))}
          {query.length > 2 && results.length === 0 ? emptyResultContent : null}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    sorts: [
      {
        property: "Sketch",
        direction: "ascending",
      },
    ],
  });
  return {
    props: {
      sketches: response.results,
    },
  };
}
