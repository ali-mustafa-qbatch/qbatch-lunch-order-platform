import type { Route } from "./+types/home";
import { Navbar } from "~/components/Navbar";
import { HomePage } from "~/components/HomePage";
import { Footer } from "~/components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main>
      <Navbar />
      <HomePage />
      <Footer />
    </main>
  );
}
