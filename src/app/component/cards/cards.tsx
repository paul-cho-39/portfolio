import Cards from './card';
import { Title } from './sectionTitle';
import { ProjectLayout } from '../layouts/project';

import data from '@/constants/data/projects.json';

const ProjectCards = ({}) => {
   return (
      <section className='bg-slate-100'>
         {/* project title here */}
         <Title title='Some Stuff I Built' />
         <ProjectLayout>
            <Cards projects={data.projects} />
         </ProjectLayout>
      </section>
   );
};

export default ProjectCards;
