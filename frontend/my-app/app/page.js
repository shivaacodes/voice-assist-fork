"use client";

import Hero from "@/components/costum/Hero";
import Feature from "@/components/costum/Feature";
import Main from "@/components/costum/Main";

export default function Home() {
  return (
    <div className="relative w-full flex flex-col">
      <div className="min-h-screen">
        <div className="w-full flex justify-end p-6" />
        <Hero />
      </div>
      <Feature />
      <Main />
    </div>
  );
}
