"use client";

import { useEffect, useState } from "react";

export function Typewriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [text]);
  return (
    <span style={{ display: "block", width: "100%", textAlign: "center" }}>
      {displayed}
      <span
        style={{
          display: "inline-block",
          width: "2px",
          height: "1em",
          background: "#e8186d",
          marginLeft: "2px",
          verticalAlign: "middle",
          animation: done ? "blink 1s step-end infinite" : "none",
        }}
      />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  );
}
