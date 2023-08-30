import Cards from './card';
import { Title } from './sectionTitle';
import { ProjectLayout } from '../layouts/project';

import data from '@/constants/data/projects.json';
import { SectionHeader } from '../headers/sectionHeader';

const ProjectCards = ({}) => {
   return (
      // TODO: change bg-color(?)
      <section id='projects' className='bg-slate-100'>
         <ProjectLayout>
            <SectionHeader title='Some Stuff I Built' />
            <Cards projects={data.projects} />
         </ProjectLayout>
      </section>
   );
};

export default ProjectCards;
