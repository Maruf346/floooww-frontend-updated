export type Platform = "Instagram" | "YouTube" | "Snapchat" | "Pinterest";
export type PlatformLogoStyle = "Color" | "Mono" | "White";

export type UserRole = "brand" | "creator" | "agency";

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
  hint?: string;
  disabled?: boolean;
}
