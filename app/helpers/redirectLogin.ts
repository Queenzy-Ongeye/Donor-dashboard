import { useRouter } from "next/navigation";
import React from "react"

const RedirectLogin = () => {
  const route = useRouter();
  route.push("/auth/signIn");
};

export default RedirectLogin;
