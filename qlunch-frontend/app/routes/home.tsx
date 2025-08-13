import type { Route } from "./+types/home";
import { AuthProvider } from "../context/AuthContext";
// import { Navbar } from "~/components/Navbar";
import { HomePage } from "~/components/HomePage";
import ArcGalleryHero from "~/components/arc-gallery-hero";
import { Footer } from "~/components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "QLunch | Home" },
    { name: "description", content: "Welcome to QLunch!" },
  ];
}

export default function Home() {
  const images = [
  '/mudassir-zaheer-V6XrszoqjNk-unsplash.jpg', 
  '/anh-nguyen-kcA-c3f_3FE-unsplash.jpg', 
  '/anna-tukhfatullina-food-photographer-stylist-Mzy-OjtCI70-unsplash.jpg',
  '/alex-munsell-Yr4n8O_3UPc-unsplash.jpg',
  '/kalpa-mahagamage-LxkWpGMEwlM-unsplash.jpg',
  '/umair-ali-asad-rRFE8agWJNw-unsplash.jpg',
  '/ananthan-chithiraikani-FAjiQN9xowE-unsplash.jpg',
  '/shourav-sheikh-a66sGfOnnqQ-unsplash.jpg',
  '/joshua-kantarges-wO4CyWnIzz4-unsplash.jpg',
  'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f',
  '/joseph-gonzalez-zcUgjyqEwe8-unsplash.jpg'
];

  return (
    <AuthProvider>
      <main>
        {/* <Navbar /> */}
        <ArcGalleryHero images={images} />
        <HomePage />
        <Footer />
      </main>
    </AuthProvider>
  );
}
