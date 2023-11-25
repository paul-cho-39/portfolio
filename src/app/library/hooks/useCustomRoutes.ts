import { useRouter } from 'next/router';
import routes from '@/app/utils/routes';

interface CustomRouteParams {
   path?: string;
   goBack?: boolean;
}

function useCustomRoutes(params: CustomRouteParams) {
   const { path, goBack } = params;
   const router = useRouter();

   if (goBack && path) {
      throw new Error('Provide only one param to go back or the path');
   }

   if (path) {
      router.push(path);
   }
   if (goBack) {
      router.back();
   }
}

export default useCustomRoutes;
