import router, { useRouter } from "next/router";
import { SketchList } from "../constants/SketchList";
import { useEffect } from "react";
import Head from "next/head";

export const getStaticProps = async ({ params }) => {
  const currentSketch = SketchList.filter(
    (sketch) => sketch.slug === params.slug
  );
  return {
    props: {
      sketch: currentSketch[0],
    },
  };
};

export const getStaticPaths = async () => {
  const paths = SketchList.map((sketch) => ({
    params: { slug: sketch.slug },
  }));
  return { paths, fallback: false };
};

export default function SketchPage({ sketch }) {
  useEffect(() => {
    window.location.assign(sketch.netflixLink);
  });

  const ComposedHead = () => {
    return (
      <Head>
        <title>{sketch.name}</title>
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
          src="https://cdn.usefathom.com/script.js"
          data-site="XWPPCZKS"
          defer
        ></script>
      </Head>
    );
  };

  return (
    <>
      <ComposedHead />
      <div>Hello</div>
      <h1>{sketch.name}</h1>
    </>
  );
}
