export const clearLocalStorageStartingWith = (prefix: string) => {
  const localStorageLength = localStorage.length;
  for (let i = 0; i < localStorageLength; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix)) {
      localStorage.removeItem(key);
    }
  }
};
