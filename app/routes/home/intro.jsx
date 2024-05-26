import { DecoderText } from '~/components/decoder-text';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { useTheme } from '~/components/theme-provider';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { VisuallyHidden } from '~/components/visually-hidden';
import { Link as RouterLink } from '@remix-run/react';
import { useInterval, usePrevious, useScrollToHash } from '~/hooks';
import { Suspense, lazy, useEffect, useState } from 'react';
import { cssProps, media } from '~/utils/style';
import config from '~/config.json';
import { useHydrated } from '~/hooks/useHydrated';
import styles from './intro.module.css';
import SvgComponent from './svg-component.jsx';
import SvgFace from './svg-face.jsx';

import * as pkg from 'react-rough-fiber';
import { animate } from 'framer-motion';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';

import { Image } from '~/components/image/index.js';
import ShibrainWorkOne from '~/assets/shibrainwork-one.webp';
import ShibrainWorkOneLarge from '~/assets/shibrainwork-one-large.webp';
import ShibrainWorkOnePlaceholder from '~/assets/shibrainwork-one-placeholder.png';
const {RoughSVG} = pkg;

export const useAnimatedCounter = (
  maxValue,
  initialValue = 0,
  duration = 1,
) => {
  const [counter, setCounter] = useState(initialValue);

  useEffect(() => {
    const controls = animate(initialValue, maxValue, {
      duration,
      repeat: Infinity,
      ease: "linear",
      onUpdate(value) {
        setCounter(value);
      }
    });
    return () => controls.stop();
  }, [initialValue, maxValue, duration]);

  return counter.toFixed(2);
};


export function Intro({ id, sectionRef, scrollIndicatorHidden, ...rest }) {
  const { theme } = useTheme();
  const { disciplines } = config;
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const prevTheme = usePrevious(theme);
  const introLabel = [disciplines.slice(0, -1).join(', '), disciplines.slice(-1)[0]].join(
    ', and '
  );
  const currentDiscipline = disciplines.find((item, index) => index === disciplineIndex);
  const titleId = `${id}-title`;
  const scrollToHash = useScrollToHash();
  const isHydrated = useHydrated();

  useInterval(
    () => {
      const index = (disciplineIndex + 1) % disciplines.length;
      setDisciplineIndex(index);
    },
    5000,
    theme
  );

  useEffect(() => {
    if (prevTheme && prevTheme !== theme) {
      setDisciplineIndex(0);
    }
  }, [theme, prevTheme]);



  let testround = useAnimatedCounter(1,8,1);



  return (
    <Section
      className={styles.intro}
      as="section"
      ref={sectionRef}
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      {...rest}
    >
      <Transition in key={theme} timeout={3000}>
        {({ visible, status }) => (
          <>
            {isHydrated && (
              <Suspense>
                <ProjectSection>
                <ProjectSectionContent className={styles.grid}>
                  <div className={styles.gridText}>
                    <SvgComponent
                      width={256}
                      height={300}
                      title="React"
                    />
                    <p>{testround}</p>
                    <RoughSVG
                      className={styles.name}
                      data-visible={visible}
                      options={{roughness: 1, seed: testround, fillStyle: 'solid'}}>
                      <SvgComponent
                        width={256}
                        height={300}
                        title="React"
                      />
                      {/*<svg viewBox="0 0 128 128" width="512" height="512">*/}
                      {/*    <circle cx={64} cy={64} r={48} stroke="currentColor" fill="#82ca9d" />*/}
                      {/*</svg>*/}
                    </RoughSVG>
                  </div>
                  <div className={styles.gridImage}>
                    <div className={styles.gridBackground}>
                      <SvgFace
                        width={256}
                        height={300}
                        title="React"
                      />
                      <p>{testround}</p>
                      <RoughSVG
                        className={styles.name}
                        data-visible={visible}
                        options={{roughness: 2, seed: testround, fillStyle: 'zigzag'}}>
                        <SvgFace
                          width={256}
                          height={300}
                          title="React"
                        />
                        {/*<svg viewBox="0 0 128 128" width="512" height="512">*/}
                        {/*    <circle cx={64} cy={64} r={48} stroke="currentColor" fill="#82ca9d" />*/}
                        {/*</svg>*/}
                      </RoughSVG>
                    </div>
                  </div>
                </ProjectSectionContent>
                  <header className={styles.text}>
                    <Heading level={0} as="h2" className={styles.title}>
                      <VisuallyHidden className={styles.label}>
                        {`${config.role} + ${introLabel}`}
                      </VisuallyHidden>
                      <span aria-hidden className={styles.row}>
                  <span
                    className={styles.word}
                    data-status={status}
                    style={cssProps({ delay: tokens.base.durationXS })}
                  >
                    Hand Drawn
                  </span>
                  <span className={styles.line} data-status={status} />
                </span>

                    </Heading>
                  </header>
                </ProjectSection>

              </Suspense>
            )}


          </>
        )}
      </Transition>
    </Section>
  );
}
