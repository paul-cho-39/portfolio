export default function formatDate(dateString: string) {
   const options = { day: 'numeric', month: 'short', year: 'numeric' };
   const date = new Date(dateString);
   return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
   });
}
