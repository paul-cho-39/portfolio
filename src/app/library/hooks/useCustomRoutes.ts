import { useRouter } from 'next/router';
import ROUTES, { RouteParams, RouteKeys } from '@/app/utils/routes';

interface CustomRouteParams {
   path?: keyof RouteParams | keyof RouteParams['PROJECTS'];
   goBack?: boolean;
}

function useCustomRoutes(params: CustomRouteParams) {
   const { path, goBack } = params;
   const router = useRouter();

   if (goBack && path) {
      throw new Error('Provide only one of either "path" or "goBack".');
   }

   if (path === 'PROJECTS') {
      throw new Error('The path should contain one of nested "PROJECTS". ');
   }

   if (path) {
      let routePath: string;

      if (path in ROUTES.PROJECTS) {
         // Access nested 'PROJECTS'
         routePath = ROUTES.PROJECTS[path as keyof typeof ROUTES.PROJECTS];
      } else {
         // Else it should be 'HOME'
         routePath = ROUTES['HOME'];
      }
      router.push(routePath);
   }
   if (goBack) {
      router.back();
   }
}

export default useCustomRoutes;
