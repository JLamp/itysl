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
    const description = `Episode ${sketch.episode} | Season ${sketch.season}`;
    return (
      <Head>
        <title>{sketch.name}</title>
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:image"
          content="/images/covers/baby-cries.jpg"
        />
        <meta property="og:title" content={`${sketch.name} - ITYSL`} />
        <meta property="og:image" content="/images/covers/baby-cries.jpg" />
        <meta property="og:description" content={description} />
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
      <img src="/images/covers/baby-cries.jpg" />
      <h1>{sketch.name}</h1>
    </>
  );
}
