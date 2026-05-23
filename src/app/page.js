"use client";
import HeroHome from "./../components/HeroHome/HeroHome";
import TrustedBy from "./../components/Home/TrustedBy";
import AboutUs from "./../components/Home/AboutUs";
import OurWorldWideReach from './../components/Home/OurWorldWideReach';
import useAuth from "@/auth/useAuth";
export default function Home() {
  const {user} =useAuth()  

  return (
    <main>
      <HeroHome />
      <TrustedBy />
      <AboutUs />
      <OurWorldWideReach />
    </main>
  );
}
