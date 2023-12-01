export function formatDate(date: Date): string {
   const day = date.getDate();
   const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
   ];
   const month = monthNames[date.getMonth()];
   const year = date.getFullYear();

   const ordinalSuffix = getOrdinalSuffix(day);

   return `${day}${ordinalSuffix} ${month} ${year}`;
}

function getOrdinalSuffix(day: number): string {
   const j = day % 10,
      k = day % 100;
   if (j == 1 && k != 11) {
      return 'st';
   }
   if (j == 2 && k != 12) {
      return 'nd';
   }
   if (j == 3 && k != 13) {
      return 'rd';
   }
   return 'th';
}
