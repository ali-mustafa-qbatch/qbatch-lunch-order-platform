import type { Route } from "./+types/home";
import { AuthProvider } from "../context/AuthContext";
import { Navbar } from "~/components/Navbar";
import { HomePage } from "~/components/HomePage";
import { Footer } from "~/components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "QLunch | Home" },
    { name: "description", content: "Welcome to QLunch!" },
  ];
}

export default function Home() {
  return (
    <AuthProvider>
      <main>
        <Navbar />
        <HomePage />
        <Footer />
      </main>
    </AuthProvider>
  );
}
