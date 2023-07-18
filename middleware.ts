// middleware.ts
import { stackMiddlewares } from "utils/middlewares/stackMiddlewares";
import { withApi } from "utils/middlewares/withApi";
import { withHeaders } from "utils/middlewares/withHeaders";
import { withLogging } from "utils/middlewares/withLogging";
import { supaMiddleware } from "utils/middlewares/withSession";

const middlewares = [withLogging, withHeaders, withApi, supaMiddleware];

export default stackMiddlewares(middlewares);
export const config = {
  //  matcher: ["/((?!_next/static|favicon.ico).*)"],
};
