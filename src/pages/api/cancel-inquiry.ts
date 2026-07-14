import type { APIRoute } from "astro";
import { recentInquiryCookieName } from "../../lib/recent-inquiry";

export const prerender = false;

export const POST: APIRoute = async ({ cookies, redirect, request }) => {
  const formData = await request.formData();
  const locale = formData.get("locale") === "ja" ? "ja" : "en";

  cookies.delete(recentInquiryCookieName, { path: "/" });

  return redirect(`/${locale}/inquiries`, 303);
};
