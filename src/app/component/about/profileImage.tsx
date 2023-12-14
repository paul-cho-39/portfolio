import Image from 'next/image';

const ProfileImage = () => {
   return (
      <Image
         style={{
            borderRadius: '10%',
         }}
         className='w-full overflow-hidden h-auto'
         src='/images/about_me.jpg'
         alt='Photo of Paul Cho'
         width={75}
         height={75}
         objectFit='true'
         priority
         layout='responsive'
         // placeholder='blur'
         //   blurDataURL={smallImageDataUrl} // low-res image or data URL
      />
   );
};

export default ProfileImage;
