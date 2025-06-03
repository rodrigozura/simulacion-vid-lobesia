import { useState } from 'react';
import usePseudorandomNumber from './usePseudorandomNumber';

const useNormalDistribution = () => {

  const getNextRandomNumber = usePseudorandomNumber();

  const generateNormal = (media: number, desvio: number) => {
    // console.log("Media:",media,"Desvio:", desvio)
    const countDecimals = (num: number): number => {
      const str = num.toString();
      const decimalPart = str.split('.')[1];
      return decimalPart ? decimalPart.length : 0;
    };

    const decimalPlaces = countDecimals(desvio);
    // console.log("Cantidad de decimales en el desvío:", decimalPlaces);

    let sum = 0
    for (let i = 1; i < 12; i++) {
      let u = getNextRandomNumber();
      // console.log("Numero Aleatorio num:", i, " - Numero: ", u)
      sum = sum + u
    }
    // console.log(sum)
    let x = Number((desvio*(sum-6)+media).toFixed(decimalPlaces))
    return x
  }

  return generateNormal;
};

export default useNormalDistribution;
