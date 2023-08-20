import { Montserrat_Alternates, Pacifico } from 'next/font/google';

const montserratAlternatives = Montserrat_Alternates({
    weight: '800',
    style: ['normal', 'italic'],
    subsets: ['latin'],
 });

const pacifico = Pacifico({
    weight: '400', 
    style: ["normal"],
    subsets: ["latin"]
})

const FrontCover = () => {
    // pass boolean state here
   return (
      <div>
         <span>Hi I'm Paul</span>
         <h1>
            I like I like making things. And build <span
            onMouseEnter={() => console.log("mouse entered")}
            onMouseLeave={() => }
            >creative</span> things.
         </h1>
      </div>
   );
};

export default FrontCover;
