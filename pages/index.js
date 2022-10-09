import { Section } from "../components/Section";
import { RandomButton } from "../components/RandomButton";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { Search } from "../components/Search";
import styled from "styled-components";
import { device } from "../constants/Devices";
import { SketchList } from "../constants/SketchList";
import { Sketch } from "../components/Sketch";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1040px;
  margin: auto;
  padding: 24px 16px;

  @media ${device.tablet} {
    padding: 48px;
  }
`;

const Footer = styled.div`
  width: 100%;
  margin-bottom: 48px;
  color: white;
  opacity: 50%;

  a {
    text-decoration: underline;
  }
`;

export default function Home({ sketches }) {
  return (
    <div>
      <Head>
        <title>I Think You Should Leave Db</title>
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:image"
          content="https://i.ibb.co/n6GPwBM/meta-image.jpg"
        />
        <meta property="og:title" content="I Think You Should Leave Database" />
        <meta
          property="og:image"
          content="https://i.ibb.co/n6GPwBM/meta-image.jpg"
        />
        <meta
          property="og:description"
          content="I think it's a good website, and I stand by it."
        />
        <meta
          property="og:description"
          content="I think it's a good website, and I stand by it."
        />
        <script
          defer
          data-domain="itylsdb.com"
          src="https://plausible.io/js/plausible.js"
        ></script>
        <script
          src="https://cdn.usefathom.com/script.js"
          data-site="XWPPCZKS"
          defer
        ></script>
      </Head>
      <Container>
        <RandomButton sketches={SketchList} />
        <Search sketches={SketchList} />
        <Section sketches={SketchList} season={1} />
        <Section sketches={SketchList} season={2} />
        <Section sketches={SketchList} season={0} />
        <Footer>
          Site by <a href={"https://twitter.com/JLampron"}>lamp</a>
        </Footer>
      </Container>
      <ToastContainer transition={Slide} />
    </div>
  );
}
