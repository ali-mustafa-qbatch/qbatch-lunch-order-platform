import type { Route } from "./+types/home";
import { Navbar } from "~/components/Navbar";
import { SignUpForm } from "~/components/SignUpForm";
import { Footer } from "~/components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign Up Page" },
    { name: "description", content: "Welcome to sign up page!" },
  ];
}

export default function signup() {
  return (
    <main>
      <Navbar />
      <SignUpForm />
      <Footer />
    </main>
  );
}
