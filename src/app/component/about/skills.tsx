// pretend that the layout is already applied
import { CircleStackIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import ReactIcon from '../svg/reactIcon';

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
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
         {SkillsSection.map((skill, index) => (
            <div
               key={index}
               className='border-2 border-gray-300 rounded-md p-4 h-auto min-h-[200px]'
            >
               <div className='flex flex-col items-center'>
                  <skill.icons
                     strokeWidth={skill.icons === ReactIcon ? 1 : 0.9}
                     className='h-12 w-12 mb-4'
                  />
                  <h3 className='text-2xl mb-2'>{skill.section}</h3>
               </div>
               <div className='py-2'>
                  <p className='text-center'>{skill.description}</p>
               </div>
            </div>
         ))}
      </div>
   );
};
