"use client";
import HeroHome from "./../components/HeroHome/HeroHome";
import TrustedBy from "./../components/Home/TrustedBy";
import AboutUs from "./../components/Home/AboutUs";
import OurWorldWideReach from './../components/Home/OurWorldWideReach';
import useAuth from "@/auth/useAuth";
export default function Home() {
  const {user} =useAuth()  
  
  console.log("Home page rendered", user);
  return (
    <main>
      <HeroHome />
      <TrustedBy />
      <AboutUs />
      <OurWorldWideReach />
    </main>
  );
}
