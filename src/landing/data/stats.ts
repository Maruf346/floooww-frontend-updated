export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  caption: string;
}

/* Final values from the count-up end state (Figma 895:2476). */
export const STATS: StatItem[] = [
  {
    value: 120,
    suffix: "K+",
    label: "Verified creators",
    caption: "across 60+ content categories",
  },
  { value: 600, suffix: "+", label: "Brand projects", caption: "run through Floooww" },
  { value: 18, suffix: " Cr+", label: "Combined reach", caption: "across all creator audiences" },
];
