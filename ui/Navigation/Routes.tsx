import { FaHouse, FaPlus, FaRocket, FaUser } from "react-icons/fa6";

type NavigationRoute = {
  name: string;
  route: any;
  icon?: any // Change 'any' to a more specific type
};

const PublicRoutes: NavigationRoute[] = [
  {
    name: 'Home',
    route: '/',
    icon: <FaHouse className="h-3 justify-center mx-auto "/>
  }
];

export const getUserRoutes = (x: string): NavigationRoute[] => [
  {
    name: 'Explore',
    route: '/explore',
    icon: <FaRocket className="h-3 justify-center mx-auto "/>
  },
  {
    name: 'Create',
    route: '/create',
    icon: <FaPlus className="h-3 justify-center mx-auto "/>
  },
  {
    name: 'Profile',
    route: '/' + x,
    icon: <FaUser className="h-3 justify-center mx-auto "/>
  }
];

const AdminRoutes: NavigationRoute[] = [
  {
    name: 'Database',
    route: 'https://supabase.com/dashboard/project/vmyqkspfxrzxteohsrbk'
  },
  {
    name: 'Deployments',
    route: 'https://vercel.com/thecrib/subport-beta/deployments'
  },
  {
    name: 'Redis (Cache)',
    route: 'https://console.upstash.com/'
  },

  {
    name: 'Test Panel',
    route: '/test'
  },
  {
    name: 'Spotify Test Panel',
    route: '/test/spotify'
  }
];

export { AdminRoutes, PublicRoutes };
export type { NavigationRoute };

