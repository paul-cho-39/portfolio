import Cards from './card';
import { ProjectLayout } from '../layouts/home/projectSectionLayout';

import data from '@/constants/data/projects.json';
import { SectionHeader } from '../headers/title';

const ProjectCards = ({}) => {
   return (
      <ProjectLayout>
         <SectionHeader title='Some Stuff I Built' />
         <main>
            <Cards projects={data.projects} />
         </main>
      </ProjectLayout>
   );
};

export default ProjectCards;
