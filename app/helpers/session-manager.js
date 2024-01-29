import * as Sentry from "@sentry/nextjs";
import { getSession } from "next-auth/react";
import RedirectLogin from "./redirectLogin";

let loader, token;



async function load() {
  if (loader) await loader;

  if (token) return;

  return (loader = (async () => {
    try {
      const session = await getSession();
      token = session?.user.accessToken;
      if (!token) {
        return <RedirectLogin/>;
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  })());
}

export const getToken = async () => {
  await load();
  return token;
};
