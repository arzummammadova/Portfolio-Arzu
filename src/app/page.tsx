'use client';
import { useEffect } from 'react';
import Education from "@/components/Education";
import Hero from "@/components/Hero";

export default function Home() {
  

  return (
    <div>
      <div className="custom-cursor"></div>

      <Hero />

      <Education />
    </div>
  );
}
