import { useState } from 'react';
import usePseudorandomNumber from './usePseudorandomNumber';

const useNormalDistribution = () => {

  const getNextRandomNumber = usePseudorandomNumber();

  const generateNormal = (media: number, desvio: number) => {
    let sum = 0
    for (let i = 1; i < 12; i++) {
      let u = getNextRandomNumber();
      sum = sum + u
    }
    let x = desvio*(sum-6)+media
    return x
  }

  return generateNormal;
};

export default useNormalDistribution;