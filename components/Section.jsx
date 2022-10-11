import { Sketch } from "./Sketch";
import { SectionHeader } from "./SectionHeader";
import styled from "styled-components";
import { device } from "../constants/Devices";
import { SketchList } from "../constants/SketchList";

export function Section({ season }) {
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
        {SketchList.filter((sketch) => sketch.season === season).map(
          (sketch) => (
            <Sketch
              key={sketch.slug}
              image={sketch.slug}
              title={sketch.name}
              season={season}
              episode={sketch.episode}
              link={sketch.netflixLink}
              slug={sketch.slug}
            />
          )
        )}
      </Grid>
    </div>
  );
}
