import { ADMIN_COOKIE } from "../../utils/admin-auth";

export default defineEventHandler((event) => {
  setCookie(event, ADMIN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return { ok: true };
});
