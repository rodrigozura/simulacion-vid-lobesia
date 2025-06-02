import usePseudorandomNumber from './usePseudorandomNumber';

const useExponentialDistribution = () => {
  const getNextRandomNumber = usePseudorandomNumber();

  /**
   * Genera un número aleatorio con distribución exponencial.
   * @param ex El parámetro de escala (media de la distribución exponencial).
   * @returns Un número aleatorio con distribución exponencial.
   */
  const generateExponential = (ex: number) => {
    const u = getNextRandomNumber();
    // Evitar log(0)
    const safeU = u === 0 ? Number.MIN_VALUE : u;
    return -ex * Math.log(safeU);
  };

  return generateExponential;
};

export default useExponentialDistribution;