"use client";
import { SessionProvider, getSession, signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import LoaderSpinner from "../LoadingSpinner";

interface IChildren {
  children: React.ReactNode;
}

const SecurePages = ({ children }: IChildren) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const securePages = async () => {
      const session = await getSession();
      if (!session || !session.user) {
        signIn();
      } else {
        setLoading(false);
      }
    };
    securePages();
  }, []);

  if (loading) {
    return <LoaderSpinner />;
  }

  return <SessionProvider>{children}</SessionProvider>;
};
export default SecurePages;
