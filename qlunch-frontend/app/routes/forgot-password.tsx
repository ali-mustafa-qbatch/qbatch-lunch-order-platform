import type { Route } from "./+types/home";
import { AuthProvider } from "../context/AuthContext";
import { Navbar } from "~/components/Navbar";
import { ForgotPassword } from "~/components/ForgotPassword";
import { Footer } from "~/components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "QLunch | Forgot Password" },
    { name: "description", content: "Forgot Password page to reset account password." },
  ];
}

export default function Home() {
  return (
    <AuthProvider>
      <main>
        <Navbar />
        <ForgotPassword />
        <Footer />
      </main>
    </AuthProvider>
  );
}
