"use client";

import Hero from "@/components/costum/Hero";
import Statement from "@/components/costum/Statement";
import Feature from "@/components/costum/Feature";
import Main from "@/components/costum/Main";

export default function Home() {
  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="mb-40">
        <Hero />
      </div>
      <div className="mb-16">
        <Statement />
      </div>
      <div className="mb-16">
        <Feature />
      </div>
      <Main />
    </div>
  );
}
