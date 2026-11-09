/** Height reserved for the sticky site header when scrolling to anchors. */
export const HEADER_OFFSET = 76;

export function scrollToElement(element: HTMLElement, behavior: ScrollBehavior = "smooth") {
  const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior });
}

export function scrollToTop(behavior: ScrollBehavior = "smooth") {
  window.scrollTo({ top: 0, behavior });
}
