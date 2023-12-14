// pretend that the layout is already applied
import { CircleStackIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import ReactIcon from '../svg/reactIcon';
import { Divider } from '../layouts/divider';

// TODO: let's highlight the important part and highlight that part
const SkillsSection = [
   {
      section: 'Web & Mobile Development',
      icons: ReactIcon,
      description:
         'Specialize in building scalable web applications and cross-platform mobile apps using Django, NodeJS, Express, React, and React Native.',
   },
   {
      section: 'Database Management',
      icons: CircleStackIcon,
      description:
         'Experienced in Postgresql, AWS, and Firebase for robust database and cloud infrastructures.',
   },
   {
      section: 'Programming Languages & Tools',
      icons: ComputerDesktopIcon,
      description:
         'Skilled in TypeScript, Python, JavaScript, HTML, CSS, and dev tools like Git for well-rounded software development.',
   },
] as const;

// TODO: create a divider
export const Skills = () => {
   return (
      <div className='px-0'>
         <SkillsHeader />
         <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:px-6 lg:grid-cols-3 lg:gap-5 xl:gap-6'>
            {SkillsSection.map((skill, index) => (
               <div
                  key={index}
                  className='font-sans border-[6px] border-blue-500/50 rounded-md p-4 h-auto sm:max-h-[400px]'
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
                  <div className='py-2'>
                     <p className='text-center lg:text-xl'>{skill.description}</p>
                  </div>
               </div>
            ))}
         </div>
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
