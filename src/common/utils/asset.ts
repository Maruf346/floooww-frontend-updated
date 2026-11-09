/** Resolves a file in `public/assets` against the deployed base URL. */
export function asset(fileName: string): string {
  return `${import.meta.env.BASE_URL}assets/${fileName}`;
}
