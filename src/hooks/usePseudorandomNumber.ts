import { useState, useEffect, useCallback, useRef } from 'react';

const usePseudorandomNumber = () => {
  const generateRandomParameters = () => {
    const seed = Math.floor(Math.random() * 100000) + 1; // Semilla
    const multiplier = Math.floor(Math.random() * 100000) + 1; // Multiplicador
    const modulus = Math.floor(Math.random() * 100000) + 1; // Módulo
   
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
    return Math.random();
  }, [randomParameters]);

  useEffect(() => {
    currentValueRef.current = randomParameters.seed;
  }, [randomParameters]);

  return getNextRandomValue;
};

export default usePseudorandomNumber;