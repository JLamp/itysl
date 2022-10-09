import router, { useRouter } from "next/router";
import { SketchList } from "../constants/SketchList";
import { useEffect } from "react";

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
  return (
    <>
      <div>Hi</div>
      <h1>{sketch.name}</h1>
    </>
  );
}
