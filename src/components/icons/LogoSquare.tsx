'use client';

import { cn } from '@/lib/utils';

interface LogoSquareProps {
  className?: string;
  size?: number;
}

/**
 * PROOF OF WEAR Logo - Square/Icon version
 * Bitcoin symbol with brutalist styling
 */
export function LogoSquare({ className, size = 48 }: LogoSquareProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={cn(className)}
    >
      {/* Background */}
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        fill="var(--accent)"
        stroke="currentColor"
        strokeWidth="3"
      />

      {/* Bitcoin symbol */}
      <text
        x="24"
        y="34"
        textAnchor="middle"
        fontFamily="Arial Black, sans-serif"
        fontSize="28"
        fontWeight="900"
        fill="currentColor"
      >
        ₿
      </text>

      {/* Bottom accent bar */}
      <rect x="2" y="40" width="44" height="6" fill="var(--fire)" />
    </svg>
  );
}
