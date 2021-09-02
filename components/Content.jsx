import { Client } from "@notionhq/client";
import Fuse from "fuse.js";
import React, { useState } from "react";
import styles from "../styles/Content.module.css";
import { ResultsList } from "../components/ResultsList";
import { SectionHeader } from "../components/SectionHeader";
import Image from "next/image";
import logo from "../public/images/logo.svg";

export function Content({ sketches }) {
  console.log(SketchArray);
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
      Cover: sketch.properties.image.rich_text[0]["plain_text"],
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

  const resultsArray = results.map((sketch) => sketch.item);

  var placeHolderText = "Search";

  const emptyResultContent = (
    <div className={styles.emptyResult}>
      All right you know what? This is dumb. Dump it. Trash it. This one's
      garbage.
    </div>
  );

  function handleBlur() {}

  const defaultContent = (
    <div>
      <SectionHeader season={1} />
      <ResultsList
        sketches={sketchArray.filter((sketch) => sketch.Season === 1)}
      />
      <SectionHeader season={2} />
      <ResultsList
        sketches={sketchArray.filter((sketch) => sketch.Season === 2)}
      />
    </div>
  );

  const filteredContent = (
    <div>
      <ResultsList sketches={resultsArray} />
    </div>
  );

  return (
    <div className={styles.contentContainer}>
      <div className={styles.pageHeader}>
        <Image
          src={logo}
          priority={true}
          alt="I Think You Should Leave Database"
        />
        <input
          className={styles.searchInput}
          type="search"
          value={query}
          onChange={onSearch}
          placeholder={placeHolderText}
        />
      </div>
      {query.length > 0 ? filteredContent : defaultContent}
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
