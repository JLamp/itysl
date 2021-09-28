import styled from "styled-components";

const SectionHeaderWrapper = styled.div`
  font-weight: 400;
  font-style: normal;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-style: italic;
  flex-wrap: nowrap;
  align-items: baseline;
  font-family: cooper-black-std, serif;
  margin-bottom: 24px;
  font-size: 24px;
  color: white;
`;

const Jump = styled.a`
  font-size: 14px;
`;

export function SectionHeader({ season }) {
  const HeaderText = season !== 0 ? "Season " + season : "The Characters";
  const seasonID = "season" + season.toString();
  const otherSeason = (season === 1 ? 2 : 1).toString();
  const otherSeasonID = "#season" + otherSeason;
  const arrow = season === 1 ? "↓" : "↑";
  return (
    <SectionHeaderWrapper id={seasonID}>
      <span>{HeaderText}</span>
      <Jump href={otherSeasonID}>
        {arrow} Jump to Season {otherSeason}
      </Jump>
    </SectionHeaderWrapper>
  );
}
