"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  target: number;
  suffix?: string;
  suffixSmall?: string;
  duration?: number;
  delay?: number;
  label: string;
};

export function StatCounter({
  target,
  suffix = "",
  suffixSmall,
  duration = 2000,
  delay = 0,
  label,
}: Props) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => {
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [started, target, duration, delay]);

  return (
    <div
      ref={ref}
      className="rounded-xl p-8 text-center"
      style={{
        background: "#1a1a1a",
        border: "1px solid rgba(232, 24, 109, 0.2)",
      }}
    >
      <span className="font-bebas text-5xl text-fsa-rose block mb-1">
        {count}
        {suffix}
        {suffixSmall && <span className="text-2xl"> {suffixSmall}</span>}
      </span>
      <span
        className="font-barlow-condensed uppercase text-xs tracking-widest mt-1 block"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        {label}
      </span>
    </div>
  );
}
