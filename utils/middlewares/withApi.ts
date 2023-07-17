import { NextRequest, NextMiddleware, NextFetchEvent } from "next/server";
import { MiddlewareFactory } from "./types";

export const withApi: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const response = await next(request, _next);

    const origin = request.headers.get("origin");
    console.log(origin);
    if (response) {
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
  };
};
