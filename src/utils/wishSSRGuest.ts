import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export function withSSRGuest(fn: GetServerSideProps) {
  return async (ctx) => {
    const cookies = parseCookies(ctx);
    if (cookies["next-auth.token"]) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }
  };
}
