export const scrollIntoViewIfNeeded = (
  target: HTMLElement,
  scrollContainer?: HTMLElement | null,
  behavior: ScrollBehavior = 'auto',
) => {
  const maxBottomPosition = scrollContainer
    ? scrollContainer.getBoundingClientRect().bottom
    : window.innerHeight;
  const maxTopPosition = scrollContainer ? scrollContainer.getBoundingClientRect().top : 0;
  if (
    target.getBoundingClientRect().bottom > maxBottomPosition ||
    target.getBoundingClientRect().top < maxTopPosition
  ) {
    target.scrollIntoView({ block: 'end', inline: 'nearest', behavior });
  }
};
