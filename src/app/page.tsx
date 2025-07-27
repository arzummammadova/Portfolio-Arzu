'use client';
import { useEffect } from 'react';
import Education from "@/components/Education";
import Hero from "@/components/Hero";

export default function Home() {
  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor") as HTMLElement;

    const moveCursor = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = `${e.clientX - 30}px`;
        cursor.style.top = `${e.clientY - 30}px`;
      }
    };

    const addHover = () => cursor?.classList.add("hovering");
    const removeHover = () => cursor?.classList.remove("hovering");

    document.addEventListener("mousemove", moveCursor);

    const hoverTargets = document.querySelectorAll("a, button, .hover-target");
    hoverTargets.forEach(el => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      hoverTargets.forEach(el => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return (
    <div>
      <div className="custom-cursor"></div>
      <Hero />
      <Education />
    </div>
  );
}
