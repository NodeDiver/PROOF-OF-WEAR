'use client';

import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

/**
 * PROOF OF WEAR Logo - Horizontal
 * Bitcoin symbol replaces the "O" in PROOF
 */
export function Logo({ className, width = 400, height = 100 }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 100"
      width={width}
      height={height}
      className={cn('text-foreground', className)}
      fill="none"
    >
      {/* Main text: PR */}
      <text
        x="0"
        y="65"
        fontFamily="'Bebas Neue', 'Arial Black', sans-serif"
        fontSize="72"
        fontWeight="900"
        fill="currentColor"
        letterSpacing="2"
      >
        PR
      </text>

      {/* Bitcoin O replacement */}
      <g transform="translate(82, 12)">
        <circle
          cx="28"
          cy="35"
          r="26"
          fill="var(--accent)"
          stroke="currentColor"
          strokeWidth="4"
        />
        <text
          x="28"
          y="47"
          fontFamily="'Bebas Neue', 'Arial Black', sans-serif"
          fontSize="38"
          fontWeight="900"
          fill="currentColor"
          textAnchor="middle"
        >
          ₿
        </text>
      </g>

      {/* OF */}
      <text
        x="136"
        y="65"
        fontFamily="'Bebas Neue', 'Arial Black', sans-serif"
        fontSize="72"
        fontWeight="900"
        fill="currentColor"
        letterSpacing="2"
      >
        OF
      </text>

      {/* Small "of" connector */}
      <text
        x="228"
        y="65"
        fontFamily="'Bebas Neue', sans-serif"
        fontSize="36"
        fontWeight="700"
        fill="var(--accent)"
      >
        of
      </text>

      {/* WEAR */}
      <text
        x="268"
        y="65"
        fontFamily="'Bebas Neue', 'Arial Black', sans-serif"
        fontSize="72"
        fontWeight="900"
        fill="currentColor"
        letterSpacing="2"
      >
        WEAR
      </text>

      {/* Accent underline */}
      <rect x="0" y="80" width="400" height="8" fill="var(--accent)" />

      {/* Corner accents */}
      <rect x="0" y="0" width="20" height="4" fill="var(--fire)" />
      <rect x="0" y="0" width="4" height="20" fill="var(--fire)" />
    </svg>
  );
}
