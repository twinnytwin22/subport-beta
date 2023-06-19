type NavigationRoute = {
  name: string;
  route: any;
};

const PublicRoutes: NavigationRoute[] = [
  {
    name: "Home",
    route: "/",
  },

  {
    name: "Trending",
    route: "/trending",
  },
];

const UserRoutes: NavigationRoute[] = [
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
