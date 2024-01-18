import Image from 'next/image';

const ProfileImage = () => {
   return (
      <div className='sm:shadow-md lg:shadow-xl rounded-lg overflow-hidden inline-block'>
         <Image
            className='w-full overflow-hidden h-auto '
            src='/images/paul.jpg'
            alt='Photo of Paul Cho'
            width={75}
            height={75}
            sizes='100vw'
            priority
            objectFit='cover'
            // layout='responsive'
         />
      </div>
   );
};

export default ProfileImage;
