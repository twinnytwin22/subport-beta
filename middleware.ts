import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, NextRequest } from "next/server";
import countries from "utils/countries.json";
export async function middleware(req: NextRequest) {
  const { pathname, host, hostname, basePath, protocol } = req.nextUrl;
  console.log(`${req.nextUrl.protocol}//${req.nextUrl.host}/`);
  if (req.nextUrl.pathname === "/") {
    const { nextUrl: url, geo } = req;
    const country: string = geo?.country || "US";
    const city: string = geo?.city || "Phoenix";
    const region: string = geo?.region || "AZ";
    const countryInfo: any = countries.find((x) => x.cca2 === country);
    const currencyCode = Object.keys(countryInfo?.currencies)[0];
    const currency = countryInfo.currencies[currencyCode];
    const languages = Object.values(countryInfo.languages).join(", ");

    url.searchParams.set("country", country);
    url.searchParams.set("city", city);
    url.searchParams.set("region", region);
    url.searchParams.set("currencyCode", currencyCode);
    url.searchParams.set("currencySymbol", currency.symbol);
    url.searchParams.set("name", currency.name);
    url.searchParams.set("languages", languages);

    return NextResponse.rewrite(url);
  }

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session);
  if (req.nextUrl.pathname.startsWith("/create")) {
    if (!session) {
      return NextResponse.redirect(`${protocol}//${host}/`);
    }
  }
  return res;
}
