import { useCallback, useState } from 'react';
import { positiveModulo } from 'utils/number';

const useCircularCounter = (
  max: number,
  initialState?: number,
): [number | undefined, () => void, () => void, () => void] => {
  const [index, setIndex] = useState<number | undefined>(initialState);

  const increment = useCallback(() => {
    setIndex(prev => (prev === undefined ? 0 : positiveModulo(prev + 1, max)));
  }, [max]);

  const decrement = useCallback(() => {
    setIndex(prev => (prev === undefined ? max - 1 : positiveModulo(prev - 1, max)));
  }, [max]);

  const empty = useCallback(() => {
    setIndex(undefined);
  }, []);

  return [index, increment, decrement, empty];
};

export default useCircularCounter;
