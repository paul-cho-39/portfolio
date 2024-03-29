import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import { motion, Variants } from 'framer-motion';

import { ProjectImageProps } from './image';
import MotionTitle from './cardTitle';
import MotionDescription from './description';
import ProjectBadges from './badges';
import ProjectLinks from './links';

const ProjectImage = dynamic(() => import('./image'), {
   loading: () => <div></div>,
});

export interface ProjectsProps {
   title: string;
   section: string;
   image: string;
   description: string;
   url: string;
   github: string;
   badge: string[];
}

interface ProjectCardsProps {
   projects: ProjectsProps[];
}

const Cards = ({ projects }: ProjectCardsProps) => {
   const isOdd = (idx: number) => idx % 2 !== 0;

   const [isHovered, setIsHovered] = useState<ProjectImageProps['isHovered']>({
      idx: null,
      github: false,
      project: false,
   });

   const headerVariants: Variants = {
      hidden: {
         x: '-2%',
         opacity: 0,
      },
      visible: {
         x: '0%',
         opacity: 1,
         transition: {
            delay: 0.4,
            duration: 0.5,
         },
      },
   };

   return (
      <>
         {projects.map((project: ProjectsProps, index: number) => (
            <motion.article
               key={index}
               initial='offscreen'
               whileInView='onscreen'
               viewport={{ once: true, margin: '-16%' }}
               className={classNames(
                  isOdd(index) ? 'lg:flex-row-reverse ' : 'lg:flex-row',
                  'mx-auto flex w-full py-3 flex-col items-center mb-2 lg:mb-0'
               )}
            >
               <div
                  className={classNames(
                     'lg:w-full lg:max-w-[50rem] xl:max-w-[58rem] lg:mb-6 xl:mb-8 py-2'
                  )}
               >
                  <div
                     className={classNames(
                        isOdd(index) ? 'lg:flex-row-reverse' : 'lg:flex-row',
                        'flex flex-col px-6 lg:px-2 py-2'
                     )}
                  >
                     {/* github links and project link in desktop */}
                     <ProjectImage
                        src={project.image}
                        alt={project.title}
                        isHovered={isHovered}
                        index={index}
                        setIsHovered={setIsHovered}
                        title={project.title}
                        githubUrl={project.github}
                        projectUrl={project.url}
                     />

                     {/* CONTENTS */}
                     <motion.div
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        className={classNames(
                           // 'lg:-px-6 xl:max-w-xl bg-yellow-300',
                           'lg:-px-6 w-full lg:max-w-md xl:max-w-lg',
                           'flex-grow items-center justify-start align-top self-start w-full',
                           'md:py-2 lg:mx-4 '
                        )}
                     >
                        <MotionTitle
                           variants={headerVariants}
                           isHovered={isHovered}
                           projectUrl={project.url}
                           title={project.title}
                           subtitle={project.section}
                           isOdd={isOdd}
                           index={index}
                        />
                        <MotionDescription
                           variants={headerVariants}
                           description={project.description}
                           isOdd={isOdd}
                           index={index}
                        />
                        <ProjectBadges badges={project.badge} isOdd={isOdd} index={index} />
                        {/* resolution smaller than large */}

                        {/* github links and project link in small screen resolution */}
                        <ProjectLinks
                           title={project.title}
                           githubUrl={project.github}
                           projectUrl={project.url}
                        />
                     </motion.div>
                  </div>
               </div>
            </motion.article>
         ))}
      </>
   );
};

export default Cards;
