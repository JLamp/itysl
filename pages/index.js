import { Client } from "@notionhq/client";
import { SketchList } from "../components/SketchList";
import { RandomButton } from "../components/RandomButton"
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from 'next/head';
import { Search } from "../components/Search";
import styled from "styled-components";
import { device } from "../constants/Devices";

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
      <meta property="twitter:image" content="https://i.ibb.co/n6GPwBM/meta-image.jpg" />
      <meta property="og:title" content="I Think You Should Leave Database" />
      <meta property="og:image" content="https://i.ibb.co/n6GPwBM/meta-image.jpg" />
      <meta property="og:description" content="I think it's a good website, and I stand by it."/>
      <meta property="og:description" content="I think it's a good website, and I stand by it." />
      <script defer data-domain="itylsdb.com" src="https://plausible.io/js/plausible.js"></script>
    </Head>
    <Container>
      <RandomButton sketches={sketches}/>
      <Search sketches={sketches}/>
      <SketchList sketches={sketches} season={1}/>
      <SketchList sketches={sketches} season={2}/>
      <Footer>Site by <a href={"https://twitter.com/JLampron"}>lamp</a></Footer>
    </Container>
    <ToastContainer transition={Slide} />
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
