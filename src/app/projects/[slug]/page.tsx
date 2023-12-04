export default function ProjectsPage(props: any) {
   //
   const slug = props.params.slug;

   console.log('the slugs are');

   return <div>{slug}</div>;
}
