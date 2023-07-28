interface CirlceProps {
   height: number;
   width: number;
   radius?: number;
   x_coord?: number;
   y_coord?: number;
}

const CirlceSvg = ({ height, width, radius = 40, x_coord = 50, y_coord = 50 }: CirlceProps) => {
   return (
      <svg height={height} width={width} viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
         <path
            fill='transparent'
            id='circlePath'
            d={`
                M ${x_coord - radius}, ${y_coord}
                a ${radius}, ${radius} 0 1,1 ${radius * 2},0
                ${radius},${radius} 0 1,1 ${-2 * radius},0
               `}
         />
         <text>
            {/* measured in radians */}
            <textPath textLength={Math.floor(Math.PI * radius)} href='#circlePath'>
               Hellow World!
            </textPath>
         </text>
      </svg>
   );
};

export default CirlceSvg;
