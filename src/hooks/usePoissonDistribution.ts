import { useState, useEffect } from 'react';
import useNumeroPseudoAleatorio from './usePseudorandomNumber';

const usePoissonDistribution = () => {
    const getNextRandomNumber = useNumeroPseudoAleatorio();

    function generatePoisson(lambda: number) {
        let L = Math.exp(-lambda);
        let p = 1.0;
        let k = 0;
        
        do {
            k++;
            let u = getNextRandomNumber();
            p = p * u;
        } while (p > L);
        
        return k - 1;
    }

    return generatePoisson;
}

export default usePoissonDistribution;