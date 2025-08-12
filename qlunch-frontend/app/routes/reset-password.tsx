import type { Route } from "./+types/home";
import { AuthProvider } from "../context/AuthContext";
import { Navbar } from "~/components/Navbar";
import { ResetPassword } from "~/components/ResetPassword";
import { Footer } from "~/components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "QLunch | Reset Password" },
    { name: "description", content: "Reset Password page to reset account password." },
  ];
}

export default function resetpassword() {
  return (
    <AuthProvider>
      <main>
        <Navbar />
        <ResetPassword />
        <Footer />
      </main>
    </AuthProvider>
  );
}