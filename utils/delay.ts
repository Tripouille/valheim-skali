export const debounce = <T>(callback: (args: T) => void, delay: number) => {
  let timer: number;
  return (args: T) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      callback(args);
    }, delay);
  };
};
