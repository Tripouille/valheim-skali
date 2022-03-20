export const scrollIntoViewIfNeeded = (
  target: HTMLElement,
  scrollContainer?: HTMLElement | null,
) => {
  const maxBottomPosition = scrollContainer
    ? scrollContainer.getBoundingClientRect().bottom
    : window.innerHeight;
  if (target.getBoundingClientRect().bottom > maxBottomPosition) {
    target.scrollIntoView(false);
  }
};
