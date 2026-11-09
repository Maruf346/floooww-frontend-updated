import type { SelectOption, UserRole } from "@/common/types";
import { ROUTES } from "@/common/constants/routes";

export const ROLE_OPTIONS: SelectOption<UserRole>[] = [
  { value: "brand", label: "Brand", hint: "Run creator projects" },
  { value: "creator", label: "Creator", hint: "Get paid collaborations" },
  { value: "agency", label: "Agency", hint: "Manage many brands" },
];

export const ROLE_HOME: Record<UserRole, string> = {
  brand: ROUTES.brand,
  creator: ROUTES.creator,
  agency: ROUTES.agency,
};

export function parseRole(value: string | null): UserRole | null {
  return ROLE_OPTIONS.some((option) => option.value === value) ? (value as UserRole) : null;
}
