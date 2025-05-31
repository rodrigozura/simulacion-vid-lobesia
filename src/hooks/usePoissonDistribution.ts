import { useState, useEffect } from 'react';
import useNumeroPseudoAleatorio from './usePseudorandomNumber';

const usePoissonDistribution = (u: number) => {

    const getNextRandomNumber = useNumeroPseudoAleatorio();

    function generatePoisson(lambda: number) {
        let b = Math.exp(-lambda);
        let p = 1;
        let x = 0;
    
        while (p>b) {
          let u = getNextRandomNumber();
          p=p*u
          x=x+1
        }
        return x
    }

    return generatePoisson
}

export default usePoissonDistribution