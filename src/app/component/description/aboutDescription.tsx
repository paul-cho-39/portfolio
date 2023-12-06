import ROUTES from '@/app/utils/routes';
import Link from 'next/link';

const AboutMeDescription = () => {
   return (
      <div className='w-full max-w-4xl px-2 mt-6 my-8 z-10 md:px-6 lg:pb-8 lg:pl-8 lg:pr-2 xl:pl-10'>
         <p className='font-serif text-2xl tracking-wide indent-12 lg:leading-normal text-gray-600 xl:text-3xl'>
            Hi!My self-driven journey in tech has equipped me with a unique perspective in building
            efficient applications in both the web and mobile. <br /> My programming journey started
            off first
            <br /> Currently, I am freelancing and actively looking for a job.
            <br /> When {"I'm not coding, you'll"} find me at the gym, catching up on sports, or
            reading whatever piques my curiosity at the time
            {/* link to /about */}
            <span className='inline underline underline-offset-1 before:contents-[" "] decoration-blue-300'>
               <Link href={ROUTES.PROJECTS.ABOUT_ME}>Read complete bio</Link>
            </span>
         </p>
      </div>
   );
};

export default AboutMeDescription;

// introduction of who i am
// I love challenges
/**
 * Hello! My name is Paul. I am a self-taught developer with experience in mobile development and web application. I wanted to transition job and started learned programming in my own time. In the beginning, my goal was to deploy an application. It was not entirely a success, but I was reborn a better programmer. The
 * Currently, I am looking to jumpstart a career in software.
 * If you do not catch me
 */
// story telling of where I stand
//
//  My journey into programming has been driven largely by curiosity, challenging myself, and a passion for building web-based applications.
