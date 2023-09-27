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
    name: "Database",
    route: "https://supabase.com/dashboard/project/qjfdpaecmjljkboepipm",
  },
  {
    name: "Deployments",
    route: "https://vercel.com/thecrib/subport-beta/deployments"
  },
  {
    name: "Redis (Cache)",
    route: "https://console.upstash.com/",
  },
  
  {
    name: "Test Panel",
    route: "/test",
  },
  {
    name: "Spotify Test Panel",
    route: "/test/spotify",
  },
];

export type { NavigationRoute };
export { PublicRoutes, UserRoutes, AdminRoutes };
