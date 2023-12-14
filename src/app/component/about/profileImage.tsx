import Image from 'next/image';

const ProfileImage = () => {
   return (
      <Image
         style={{
            // clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%);', // doesnt look too good
            borderRadius: '25%',
         }}
         className='lg:w-[90%] w-full overflow-hidden h-auto'
         src='/images/about_me.jpg'
         alt='Photo of Paul Cho'
         width={75}
         height={75}
         sizes='100vw'
         priority
         // layout='responsive'
         // placeholder='blur'
         //   blurDataURL={smallImageDataUrl} // low-res image or data URL
      />
   );
};

export default ProfileImage;
