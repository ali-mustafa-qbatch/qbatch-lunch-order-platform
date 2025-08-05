import type { Route } from "./+types/home";
import { Navbar } from "~/components/Navbar";
import { SignInForm } from "~/components/SignInForm";
import { Footer } from "~/components/Footer";
import { Navigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign In Page" },
    { name: "description", content: "Welcome to sign in page!" },
  ];
}

export default function signin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('access_token');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
  }, []);

  if (isAuthenticated) {
    return <Navigate to={"/"} replace />
  }

  return (
    <main>
      <Navbar />
      <SignInForm />
      <Footer />
    </main>
  );
}
