import Image from "next/image";
import random from "../public/images/Random.png";
import styled from "styled-components";
import useSound from "use-sound";

const RandomButtonButton = styled.button`
  position: fixed;
  right: 48px;
  bottom: 48px;
  z-index: 100;
  border: none;
  cursor: pointer;
  height: 140px;
  width: 140px;
  background-color: rgba(0, 0, 0, 0);
  transition: all 110ms;

  &:hover {
    transform: scale(1.1) skew(1deg);
  }

  @media (hover: none) {
    height: 120px;
    width: 120px;
    left: 8px;
    bottom: 8px;

    &:hover {
      transform: none;
    }

    &:actve {
      transform: scale(1.1) skew(1deg);
    }
  }
`;

export function RandomButton({ sketches }) {
  function randomEp() {
    var min = Math.ceil(0);
    var max = Math.floor(sketches.length);
    var ep = Math.floor(Math.random() * (max - min) + min);
    window.open(sketches[ep].properties.Link["url"]);
  }

  const [playSound] = useSound("/sounds/random.mp3");

  return (
    <RandomButtonButton onClick={(randomEp, playSound)}>
      <Image
        src={random}
        alt="Random Episode Button"
        onClick={randomEp}
        priority={true}
      />
    </RandomButtonButton>
  );
}
