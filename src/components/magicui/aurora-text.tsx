"use client";

import React, { memo } from "react";
import { useTheme } from "next-themes";

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export const AuroraText = memo(
  ({ children, className = "", speed = 1 }: AuroraTextProps) => {
    const { resolvedTheme } = useTheme();

    const lightColors = ["#111827", "#374151", "#6b7280", "#9ca3af"];
    const darkColors = ["#ffffff", "#d1d5db", "#6b7280", "#111827"];
    const colors =
      resolvedTheme === "light" ? lightColors : darkColors;

    const gradientStyle = {
      backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${colors[0]})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animationDuration: `${10 / speed}s`,
    };

    return (
      <span className={`relative inline-block ${className}`}>
        <span className="sr-only">{children}</span>
        <span
          className="relative animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent"
          style={gradientStyle}
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
    );
  }
);

AuroraText.displayName = "AuroraText";
