import { useState } from 'react';
// pretend that the layout is already applied
import { CircleStackIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import ReactIcon from '../svg/reactIcon';
import { Divider } from '../layouts/divider';

const SkillsSection = [
   {
      section: 'Web & Mobile Development',
      icons: ReactIcon,
      description:
         'Skilled in building web applications and cross-platform mobile apps using Django, NodeJS, Express, React, and React Native.',
   },
   {
      section: 'Database Management',
      icons: CircleStackIcon,
      description:
         'Experienced in Postgresql, Neo4j, AWS, and Firebase for database and cloud infrastructure.',
   },
   {
      section: 'Programming Languages & Tools',
      icons: ComputerDesktopIcon,
      description:
         'Adept in variety of programming languages like TypeScript, Python, JavaScript, HTML, and CSS.',
   },
] as const;

const SkillWrap = () => {
   return (
      <div className='px-0 relative'>
         <SkillsHeader />
         <Skills skillSection={SkillsSection} />
      </div>
   );
};

const Skills = (props: { skillSection: typeof SkillsSection }) => {
   return (
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:px-6 lg:grid-cols-3 lg:gap-5 xl:gap-6'>
         {props.skillSection.map((skill, index) => (
            <div
               key={index}
               className='font-sans border-[6px] border-blue-500/50 rounded-md p-4 h-auto sm:max-h-[400px] relative'
            >
               <div className='flex flex-col items-center'>
                  <skill.icons
                     strokeWidth={skill.icons === ReactIcon ? 1 : 0.9}
                     className='h-12 w-12 mb-4'
                  />
                  <h3 className='text-xl highlight font-medium mb-2 text-center overflow-x-hidden lg:text-2xl'>
                     {skill.section}
                  </h3>
               </div>
               <Divider position='relative' top='top-0' className='bg-[#000333]' />
               <div className='py-4 md:py-6 lg:py-8'>
                  <p className='text-center lg:text-xl lg:leading-8'>{skill.description}</p>
               </div>
            </div>
         ))}
      </div>
   );
};

const SkillsHeader = () => {
   return (
      <h3 className='relative my-2 md:my-5 lg:my-8 text-center w-full font-semibold text-xl md:text-2xl lg:text-3xl whitespace-nowrap'>
         Skills
      </h3>
   );
};

const CloudSvg = () => {
   return (
      <svg width='200' height='100' viewBox='0 0 200 100' xmlns='http://www.w3.org/2000/svg'>
         <path
            d='M40,50 
             Q60,20 80,50 
             T120,50
             Q140,10 160,50
             Q180,30 200,50
             Q170,70 160,50
             Q140,90 120,50
             Q100,70 80,50
             Q60,80 40,50
             Q20,40 0,50
             Q20,60 40,50 Z'
            fill='#d1d8e0'
         />
      </svg>
   );
};

export default SkillWrap;
