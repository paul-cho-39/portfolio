import ROUTES from '@/app/utils/routes';
import Link from 'next/link';

const AboutMeDescription = () => {
   return (
      <p className='font-sans text-lg leading-normal md:text-2xl md:tracking-wider lg:text-3xl lg:font-medium'>
         {
            "Hello! I'm Paul, a self-taught developer whose passion for creating engaging web and mobile applications has been fueled by an unconventional, yet enriching learning journey."
         }
         <br />
         <br /> Today, I thrive on the thrill of solving complex problems and continuously evolving
         in the ever-changing tech landscape.
         <br />
         <br /> Off the clock, I find joy in books, fitness, and meaningful conversations.
         <span className='inline underline underline-offset-1 before:contents-[" "] decoration-blue-300 hover:opacity-75'>
            <Link href={ROUTES.PROJECTS.ABOUT_ME}>Read complete bio</Link>
         </span>
      </p>
   );
};

export default AboutMeDescription;
