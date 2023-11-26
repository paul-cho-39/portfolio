const PROJECT_ROUTE = '/projects/';

const ROUTES = {
   HOME: '/',
   PROJECTS: {
      GOOGLE_BOOK_PROJECT: PROJECT_ROUTE + 'google-books',
      PORTFOLIO: PROJECT_ROUTE + 'portfolio',
      MOBILE_PROJECT: PROJECT_ROUTE + 'bookmark-app',
   },
};

// recursive set so it avoids union type
type RoutePaths<T> = {
   [P in keyof T]: T[P] extends string ? T[P] : RoutePaths<T[P]>;
};
type RouteParams = RoutePaths<typeof ROUTES>;
type RouteKeys = keyof typeof ROUTES;

export type { RouteParams, RouteKeys };
export default ROUTES;
