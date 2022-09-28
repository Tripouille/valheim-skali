export type GoogleTagManagerCustomEvent = 'search_wiki_page';
export type GoogleTagManagerCustomEventData<T extends GoogleTagManagerCustomEvent> =
  T extends 'search_wiki_page' ? { search_term: string } : never;

export function sendGoogleTagManagerCustomEvent<E extends GoogleTagManagerCustomEvent>(
  event: E,
  data: GoogleTagManagerCustomEventData<E>,
) {
  if (!window) return;
  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    event,
    ...data,
  });
}
