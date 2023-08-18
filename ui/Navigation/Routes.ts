type NavigationRoute = {
  name: string;
  route: any;
};

const PublicRoutes: NavigationRoute[] = [
  {
    name: "Home",
    route: "/",
  },

];

const UserRoutes: NavigationRoute[] = [

  {
    name: "Explore",
    route: "/explore",
  },
  {
    name: "Create",
    route: "/create",
  },
  
];

const AdminRoutes: NavigationRoute[] = [
  {
    name: "Library",
    route: "/library",
  },
  {
    name: "Test Panel",
    route: "/test",
  },
];

export type { NavigationRoute };
export { PublicRoutes, UserRoutes, AdminRoutes };
