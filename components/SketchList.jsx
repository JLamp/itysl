import { Sketch } from "../components/Sketch";
import { SectionHeader } from "../components/SectionHeader";
import styled from "styled-components";
import { device } from "../constants/Devices";

export function SketchList({ sketches, season }) {
  const Grid = styled.div`
    display: grid;
    grid-column-gap: 48px;
    width: 100%;
    grid-template-columns: 1fr;

    @media ${device.tablet} {
      grid-template-columns: repeat(2, 1fr);
    }

    @media ${device.laptop} {
      grid-template-columns: repeat(3, 1fr);
    }
  `;

  return (
    <div style={{ width: "100%" }}>
      <SectionHeader
        season={season}
        onClick={() => setshow(!show)}
      ></SectionHeader>
      <Grid>
        {sketches
          .filter((sketch) => sketch.properties.Season["number"] === season)
          .map((sketch) => (
            <Sketch
              key={sketch.id}
              image={sketch.properties.image.rich_text[0]["plain_text"]}
              title={sketch.properties.Name.title[0]["plain_text"]}
              season={season}
              episode={sketch.properties.Episode["number"]}
              link={sketch.properties.Link["url"]}
            />
          ))}
      </Grid>
    </div>
  );
}
