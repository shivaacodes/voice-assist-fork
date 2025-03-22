"use client";

import Hero from "@/components/costum/Hero";
import Statement from "@/components/costum/Statement";
import Feature from "@/components/costum/Feature";
import Main from "@/components/costum/Main";
import AiFeature from "@/components/costum/AiFeature";

export default function Home() {
  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="mb-34">
        <Hero />
      </div>
      <div className="mb-16">
        <Statement />
      </div>
      <div className="mb-16">
        <Feature />
      </div>
      <div id="main" className="mb-12">
        <Main />
      </div>
      <div id="aifeature" className="mb-16">
        <AiFeature />
      </div>
    </div>
  );
}
