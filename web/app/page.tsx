import VercelHero from "@/components/home/VercelHero";
// import  Themed from "@/components/common/Footer";
import { ToggleTheme } from "@/components/ui/toggle-theme";
import { cn } from "@/lib/utils";
import React from "react";
import {Faq} from "@/components/home/Faq";
import HomNav from "@/components/HomeNav";
import Develop from "@/components/home/Develop";
import Ready from "@/components/home/Ready";
import Footer from "@/components/common/Footer";
export default function Home() {
  return (
    <>
      <HomNav />
      <VercelHero />
      <Ready />
      <Develop /> 
<Faq />
      {/* <Themed /> */}
      <Footer />
        <div className="flex w-[900px] mx-auto justify-end items-center mb-10 mt-10">
          <ToggleTheme />
        </div>
    </>
  );
}
