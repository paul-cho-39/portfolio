// pretend that the layout is already applied
import { CircleStackIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import ReactIcon from '../svg/reactIcon';

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

// <div className='mx-auto h-auto max-h-48 w-full border-2 border-stone-300'>
// <div className='p-4'>
//    <div className='flex flex-col bg-yellow-500'>
//       <h3 className='text-2xl py-4 items-center w-full text-center'>
//          Software Development
//       </h3>
//       <div className='py-2 bg-blue-400'>
//          <p className='tracking-wide lg:tracking-normal'>
//             Experienced in both functional and OOP: Dart, Python, Java, JavaScript,
//             TypeScript.
//          </p>
//       </div>
//    </div>
// </div>
// </div>
