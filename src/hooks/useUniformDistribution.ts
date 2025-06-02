import usePseudorandomNumber from './usePseudorandomNumber';

const useUniformDistribution = () => {
  const getNextRandomNumber = usePseudorandomNumber();

  /**
   * Genera un número aleatorio con distribución uniforme en el intervalo [a,b].
   * @param a Límite inferior del intervalo.
   * @param b Límite superior del intervalo.
   * @returns Un número aleatorio con distribución uniforme en [a,b].
   */
  const generateUniform = (a: number, b: number) => {
    // console.log("a: ", a, "b: ", b)
    const u = getNextRandomNumber();
    return a + (b - a) * u;
  };

  return generateUniform;
};

export default useUniformDistribution; 