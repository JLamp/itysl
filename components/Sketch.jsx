import Image from "next/image";
import copyIcon from "../public/images/link-icon.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MakeTimeStamp } from "./MakeTimeStamp";
import styled from "styled-components";
import { device } from "../constants/Devices.jsx";
import { useState } from "react";
import Link from "next/link";

const Card = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  transition: all 100ms;
  height: 222px;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
  }

  @media (hover: none) {
    transform: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    &:hover {
      transform: none;
    }
  }

  @media ${device.tablet} {
    margin-bottom: 48px;
    &:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }
`;

const Header = styled.a`
  border-radius: 8px 8px 0 0;
  position: relative;
  height: 100%;
`;

const SketchImage = styled(Image)`
  border-radius: 8px 8px 0 0;
`;

const SketchInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
`;

const SketchInfo = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.a`
  font-size: 15px;
`;

const MetaDataContainer = styled.div`
  font-size: 12px;
  margin-top: 8px;
  color: #4a4a51;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
`;

const BarContainer = styled.span`
  color: #7b7b87;
`;

const Bar = <BarContainer>|</BarContainer>;

const CopyText = styled.button`
  display: none;
  @media ${device.tablet} {
    display: block;
    opacity: ${({ isHovered }) => (isHovered ? 1 : 0)};
    transition: all 110ms;
    &:hover {
      color: black;
    }
  }
`;

const CopyIcon = styled.button`
  width: 16px;
  height: 16px;
  position: relative;
  object-fit: contain;
  margin-right: 16px;
  opacity: 30%;
  transition: all 110ms;

  &:hover {
    opacity: 60%;
  }

  &:active {
    opacity: 80%;
  }

  @media ${device.tablet} {
    display: none;
  }
`;

const ToastContent = styled.div`
  display: flex;
  align-items: center;
`;

const ToastImage = styled.div`
  width: 56px;
  height: 56px;
  position: relative;
  object-fit: contain;
  background-image: url("images/toast-image.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 8px;
`;

export function Sketch({ episode, image, link, season, title, slug }) {
  const [isHovered, updateHover] = useState(false);

  function handleMouseEnter() {
    updateHover(true);
  }

  function handleMouseLeave() {
    updateHover(false);
  }
  const coverImage = "/images/covers/" + image + ".jpg";

  const toastContent = (
    <ToastContent>
      <ToastImage />
      <span>
        That&apos;ll copy <i>reallly</i> nice!
      </span>
    </ToastContent>
  );

  const handleClick = () => {
    toast(({ closeToast }) => toastContent, {
      position: toast.POSITION.BOTTOM_LEFT,
      hideProgressBar: true,
      autoClose: 3000,
    });
  };

  const TimeStamp = MakeTimeStamp(link);

  const Metadata =
    season !== 0 ? (
      <>
        Sn. {season} {Bar} Ep.
        {episode} {Bar} {TimeStamp}
      </>
    ) : (
      <>
        The Characters {Bar} {TimeStamp}
      </>
    );

  return (
    <Card onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Header href={link} rel="noreferrer" target="_blank" tabIndex="-1">
        <SketchImage
          src={coverImage}
          layout="fill"
          objectFit="cover"
          lazyBoundary="400px"
          alt=" "
        />
      </Header>
      <SketchInfoContainer>
        <SketchInfo>
          <Title
            href={link}
            rel="noreferrer"
            target="_blank"
            aria-label="Open in Netflix"
          >
            {title}
          </Title>

          <MetaDataContainer>
            <a
              href={link}
              rel="noreferrer"
              target="_blank"
              aria-label="Open in Netflix"
            >
              {Metadata}
            </a>

            <CopyToClipboard text={`itysldb.com/${slug}`}>
              <CopyText isHovered={isHovered} onClick={handleClick}>
                Copy Link
              </CopyText>
            </CopyToClipboard>
          </MetaDataContainer>
        </SketchInfo>
        <CopyToClipboard text={link}>
          <CopyIcon onClick={handleClick}>
            <Image src={copyIcon} layout="fill" />
          </CopyIcon>
        </CopyToClipboard>
      </SketchInfoContainer>
    </Card>
  );
}
