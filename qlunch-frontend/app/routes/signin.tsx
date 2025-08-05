import type { Route } from "./+types/home";
import { Navbar } from "~/components/Navbar";
import { SignInForm } from "~/components/SignInForm";
import { Footer } from "~/components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign In Page" },
    { name: "description", content: "Welcome to sign in page!" },
  ];
}

export default function signin() {
  return (
    <main>
      <Navbar />
      <SignInForm />
      <Footer />
    </main>
  );
}
