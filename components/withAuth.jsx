"use client";
import { useEffect } from "react";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const router = useRouter();

    useEffect(() => {
      const { token } = parseCookies();

      if (!token) {
        router.replace("/");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuth;
};

const deleteCookie = (name, ctx = null) => {
  destroyCookie(ctx, name, { path: "/" });
};

export { withAuth, deleteCookie };
