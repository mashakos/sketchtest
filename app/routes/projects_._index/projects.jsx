import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { useReducedMotion } from 'framer-motion';
import { useWindowSize } from '~/hooks';
import { Link as RouterLink, useFetcher, useLoaderData, useMatches, useRouteLoaderData } from '@remix-run/react';
import { createRef, useEffect, useRef, useState } from 'react';
import { formatDate } from '~/utils/date';
import { classes, cssProps } from '~/utils/style';
import styles from './projects.module.css';

// import {Masdar} from '~/routes/projects.masdar/masdar.jsx';
import { ProjectSummary } from './project-summary';
// import reebokTexture from '~/assets/reebok-app.jpg';
// import reebokTextureLarge from '~/assets/reebok-app-large.jpg';
// import reebokTexturePlaceholder from '~/assets/reebok-app-placeholder.jpg';
// import mercbenzTexture2 from '~/assets/mercbenz-app.jpg';

export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};


export function Projects() {
  const { projects } = useLoaderData();
  const { width } = useWindowSize();
  const singleColumnWidth = 1190;
  const isSingleColumn = width <= singleColumnWidth;
  const [visibleSections, setVisibleSections] = useState([]);
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const projectFive = useRef();
  const projectSix = useRef();
  const projectSeven = useRef();
  const projectEight = useRef();
  const projectNine = useRef();
  const projectTen = useRef();
  const projectEleven = useRef();
  const projectTwelve = useRef();
  const projectThirteen = useRef();
  const projectFourteen = useRef();
  const projectFifteen = useRef();
  let sectionRefs = [projectOne, projectTwo, projectThree, projectFour, projectFive, projectSix, projectSeven, projectEight];


  // posts.map((post, index) => {
  //   sectionRefs.push(useRef());
  // });

  const saveRef = (key) => {
    sectionRefs.current = r => ( sectionRefs.current[key] = r );
    console.log(JSON.stringify(Object.entries(sectionRefs)));
  };


  //
  // sectionRefs.current = posts.map((post, index) => {
  //   sectionRefs = (element) => (sectionRefs.current[index] = element);
  // });


  useEffect(() => {
    const sections = sectionRefs;

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });


    return () => {
      sectionObserver.disconnect();
    };
  }, [visibleSections, sectionRefs]);


  const postList = projects.map((post, index) => (
        <>
            <ProjectSummary
              id={"project-" + (index + 1)}
              sectionRef={sectionRefs[index]}
              visible={visibleSections.includes(sectionRefs[index].current)}
              index={index+1}
              title={post.title}
              description={post.abstract}
              buttonText="View project"
              buttonLink={post.slug}
              model={{
                type: (post.texture2 !== "") ?  'phone' : 'laptop',
                alt: 'Annotating a biomedical image in the Enec app',
                textures: [
                  ...(post.texture2 !== "" ? (
                    [
                      {
                        srcSet: `/static/project-assets/${post.texture} 375w, /static/project-assets/${post.textureLarge} 750w`,
                        placeholder: `/static/project-assets/${post.texturePlaceholder}`,
                      },
                      {
                        srcSet: `/static/project-assets/${post.texture2} 375w, /static/project-assets/${post.texture2Large} 750w`,
                        placeholder: `/static/project-assets/${post.texture2Placeholder}`,
                      },
                    ]
                  ) : [
                    {
                      srcSet: `/static/project-assets/${post.texture} 800w, /static/project-assets/${post.textureLarge} 1920w`,
                      placeholder: `/static/project-assets/${post.texturePlaceholder}`,
                    },
                  ])
                ],
              }}
            />
        </>
      )
  );







  return (
    <div className={styles.projects}>
        {postList}
      <Footer />
    </div>
  );
}

function Barcode({ className }) {
  return (
    <svg
      className={className}
      width="153"
      height="20"
      fill="currentColor"
      viewBox="0 0 153 20"
    >
      <path
        fillOpacity=".6"
        d="M153 0v20h-2V0h2Zm-4 0v20h-4V0h4Zm-6 0v20h-2V0h2Zm-4 4v3h-2V4h2Zm-5 0V0h3v4h-3Zm-2 0h2v6h-2V4Zm0 0h-2V0h2v4Zm-4-4v4h-4v5h-2v4h-5V9h3V6h-5V0h13Zm-11 13v3h-2v-3h2Zm-4-13v6h-2v4h2v4h-2v2h2v4h-4V0h4Zm-6 4V0h-2v4h2Zm-1 6V7h-4V4h-2V0h-2v4h-2V0H86v4h-2v3h-2v2h-2v4h6v3h-2v4h6v-4h-2v-3h-2V9h-2V7h4V4h3v9h2v7h7v-4h-5v-3h-2V9h2V7h3v3h2v4h6v-4ZM74 7v3h-2v2h2v8h-4V0h8v5h-3V4h-3v3h2Zm28 13h4v-4h-4v4Zm28-6v-4h-2v6h2v4h2v-6h-2Zm9 2v-6h-2v6h-2v4h4v-4Zm-12 4v-4h-4v4h4ZM0 20h2V0H0v20Zm4 0h4V0H4v20Zm6 0h2V0h-2v20Zm5 0h7V0h-7v20Zm12 0h-3V0h3v20Zm5 0h3v-4h5v-6h-5V6h7V3h3V0h-7v3h-3V0h-3v20ZM52 3v3h-3v3h-4V6h1V3h6Zm23 13h6v4h-6v-4Zm-29-6v3h3v-3h3v3h-2v6h-3v-3h-2v-3h-2v-3h3Zm8 6v3h-2v-3h2Zm3 0v3h2v-3h2v-3h-2v3h-2Zm0 0v-6h-3v6h3Zm4-7V6h2V0h-2v6h-2v3h2Zm5-3v3h-2V6h2Zm2 0h-2V3h2v3Zm-9-3V0h-2v3h2Z"
      />
    </svg>
  );
}
