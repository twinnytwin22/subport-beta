// middleware.ts
import { stackMiddlewares } from "utils/middlewares/stackMiddlewares";
import { withApi } from "utils/middlewares/withApi";
import { withHeaders } from "utils/middlewares/withHeaders";
import { withLogging } from "utils/middlewares/withLogging";
import { supaMiddleware } from "utils/middlewares/withSession";

const middlewares = [withLogging, withHeaders, withApi, supaMiddleware];

//  matcher: ["/((?!_next/static|favicon.ico).*)"],

import { NextResponse } from "next/server";

function middleware(request: Request) {
  const origin = request.headers.get("origin");
  console.log(origin);
  request.headers.set("Content-Type", "application/json");
  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Max-Age", "86400");

  console.log("Middleware!");
  console.log(request.method);
  console.log(request.url);

  return response;
}

export const config = {
  matcher: "/api/:function*",
};