import AboutMeDescription from '../description/aboutDescription';
import ProfileImage from './profileImage';

const AboutDescriptionWrap = () => {
   return (
      <div className='flex flex-col-reverse lg:my-6 lg:grid lg:grid-cols-8 xl:grid-cols-9'>
         {/* contents */}
         <div className='mt-6 my-8 md:px-6 lg:col-span-5 lg:pb-8 xl:col-span-5'>
            <AboutMeDescription />
         </div>

         {/* AboutMeImage */}
         <div className='py-4 w-[60%] md:w-[40%] lg:h-full lg:w-full lg:col-span-3 xl:w-[90%] xl:col-start-7 inline-flex self-center justify-center items-start'>
            <ProfileImage />
         </div>
      </div>
   );
};

export default AboutDescriptionWrap;
