import Cards from './card';
import { ProjectLayout } from '../layouts/home/projectSectionLayout';

import data from '@/constants/data/projects.json';
import { SectionHeader } from '../headers/sectionHeader';

const ProjectCards = ({}) => {
   return (
      <ProjectLayout>
         <SectionHeader title='Some Stuff I Built' />
         <Cards projects={data.projects} />
      </ProjectLayout>
   );
};

export default ProjectCards;
