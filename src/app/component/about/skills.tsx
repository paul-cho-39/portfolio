import { useEffect, useRef, useState } from 'react';
// pretend that the layout is already applied
import { CircleStackIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import ReactIcon from '../svg/reactIcon';
import { Divider } from '../layouts/divider';
import classNames from 'classnames';
import ComputerText from '../svg/computerText';
import UnderlineText from '../illustrator/underlinedButton';

// const SkillsSection = [
//    {
//       section: 'Web & Mobile Development',
//       icons: ReactIcon,
//       description:
//          'Skilled in building web applications and cross-platform mobile apps using Django, Node.js, Next.js, Express, React, and React Native.',
//    },
//    {
//       section: 'Database Management',
//       icons: CircleStackIcon,
//       description:
//          'Experienced in database management with Postgresql and Neo4j, and AWS services including EC2, Lambda, S3, alongside Firebase for real-time applications and hosting.',
//    },
//    {
//       section: 'Programming Languages & Tools',
//       icons: ComputerDesktopIcon,
//       description:
//          'Adept in variety of programming languages like TypeScript, Python, JavaScript, HTML, and CSS.',
//    },
// ] as const;

const COMMA = ',\u00A0';

const SkillsSection = [
   {
      section: 'Web & Mobile Development',
      name: 'Development',
      icons: ReactIcon,
      description: (
         <div className='relative text-center'>
            <span className='inline'>
               Skilled in building web applications and cross-platform mobile apps using{' '}
            </span>
            <UnderlineText title='Node.js' nextWord={COMMA} />
            <UnderlineText title='Next.js' nextWord={COMMA} />
            <UnderlineText title='Express' nextWord={COMMA} />
            <UnderlineText title='React' nextWord={COMMA} />
            <UnderlineText title='React Native' nextWord={false} />
            <span>.</span>
         </div>
      ),
   },
   {
      section: 'Database Management',
      name: 'Database',
      icons: CircleStackIcon,
      description: (
         <div className='relative'>
            <span className='inline'>Experienced in database management with </span>
            <UnderlineText title='Postgresql' />
            <span>and </span>
            <UnderlineText title='Neo4j' />
            <span>and AWS services including </span>
            <UnderlineText title='EC2' nextWord={COMMA} />
            <UnderlineText title='Lambda' nextWord={COMMA} />
            <UnderlineText title='S3' nextWord={COMMA} />
            <UnderlineText title='Firebase ' />
            <span>for real-time applications and hosting.</span>
         </div>
      ),
   },
   {
      section: 'Programming Languages & Tools',
      name: 'Language',
      icons: ComputerDesktopIcon,
      description: (
         <div className='relative'>
            <span className='inline'>Adept in variety of programming languages like</span>
            <UnderlineText title='TypeScript' nextWord={COMMA} />
            <UnderlineText title='Python' nextWord={COMMA} />
            <UnderlineText title='JavaScript' nextWord={COMMA} />
            <UnderlineText title='HTML' nextWord={COMMA} />
            <UnderlineText title='CSS' nextWord={false} />.{/* <span>.</span> */}
         </div>
      ),
   },
] as const;

const SkillWrap = ({ className }: { className?: string }) => {
   return (
      <div className={classNames('relative', className)}>
         <SkillsHeader />
         <Skills skillSection={SkillsSection} />
      </div>
   );
};

const Skills = (props: { skillSection: typeof SkillsSection }) => {
   const [isComputerSectionHovered, setHovered] = useState(false);
   const handleHovered = (skill: (typeof SkillsSection)[number]) => {
      if (skill.name !== 'Language') {
         return;
      }

      setHovered(true);
   };

   return (
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:px-6 lg:grid-cols-3 lg:gap-5 xl:gap-6'>
         {props.skillSection.map((skill, index) => (
            <div
               key={index}
               onMouseEnter={() => handleHovered(skill)}
               onMouseLeave={() => setHovered(false)}
               className='group font-sans border-[4px] border-blue-500/50 rounded-md p-4 h-auto relative hover:border-[5px] hover:border-blue-500/30'
            >
               <div className='flex flex-col items-center'>
                  <skill.icons
                     strokeWidth={skill.icons === ReactIcon ? 1 : 0.9}
                     className={classNames(
                        skill.icons === ReactIcon
                           ? 'group-hover:spinner group-hover:text-blue-400 group-hover:outline-blue-600'
                           : skill.icons === CircleStackIcon
                           ? 'group-hover:animate-data-stack'
                           : 'group-hover:text-blue-600',
                        'h-12 w-12 mb-4'
                     )}
                  />
                  {isComputerSectionHovered && skill.icons === ComputerDesktopIcon && (
                     <ComputerText
                        className='absolute top-6 h-9 w-12 animate-write'
                        fill={'gray'}
                     />
                  )}
                  <h4 className='text-xl highlight font-medium mb-2 text-center overflow-x-hidden lg:text-2xl'>
                     {skill.section}
                  </h4>
               </div>
               <Divider position='relative' top='top-0' className='bg-[#000333]' />
               <div className='py-4 md:py-6 lg:py-8 text-black lg:text-xl lg:leading-8'>
                  {skill.description}
               </div>
            </div>
         ))}
      </div>
   );
};

const SkillsHeader = () => {
   return (
      <h3 className='relative my-2 md:my-5 lg:my-8 text-center w-full font-semibold text-xl text-black md:text-2xl lg:text-3xl whitespace-nowrap'>
         Skills
      </h3>
   );
};

export default SkillWrap;
