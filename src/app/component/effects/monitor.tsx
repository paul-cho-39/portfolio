import { Stats } from "@react-three/drei"

export const Monitor: React.FC<{}> = () => {
    return (
       <>
          <Stats showPanel={0} className='FPS'></Stats>
          <Stats showPanel={1} className='MS'></Stats>
          <Stats showPanel={2} className='MB'></Stats>
       </>
    );
 };
 