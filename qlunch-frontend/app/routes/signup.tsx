import type { Route } from "./+types/home";
import { Navbar } from "~/components/Navbar";
import { SignUpForm } from "~/components/SignUpForm";
import { Footer } from "~/components/Footer";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { AuthProvider } from "../context/AuthContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign Up" },
    { name: "description", content: "Welcome to sign up page!" },
  ];
}

export default function signup() {
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
    <AuthProvider>
      <main>
        <Navbar />
        <SignUpForm />
        <Footer />
      </main>
    </AuthProvider>
  );
}
