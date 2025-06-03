import { useState, useEffect, useCallback, useRef } from 'react';

const usePseudorandomNumber = () => {
  const generateRandomParameters = () => {
    const seed = 1317; // Semilla
    const multiplier = 5631; // Multiplicador
    const modulus = 547; // Módulo
    return { seed, multiplier, modulus };
  };

  const [randomParameters, setRandomParameters] = useState(generateRandomParameters());
  const currentValueRef = useRef(randomParameters.seed);

  const getNextRandomValue = useCallback(() => {
    let nextValue = (randomParameters.multiplier * currentValueRef.current) % randomParameters.modulus;
    if (nextValue === 0) {
      const newParameters = generateRandomParameters();
      setRandomParameters(newParameters);
      nextValue = newParameters.seed;
    }
    const u = nextValue / randomParameters.modulus;
    currentValueRef.current = nextValue; // Actualizamos la referencia directamente
    return Number(u.toFixed(3));
  }, [randomParameters]);

  useEffect(() => {
    currentValueRef.current = randomParameters.seed;
  }, [randomParameters]);

  return getNextRandomValue;
};

export default usePseudorandomNumber;