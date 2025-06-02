"use client"

import { useState } from "react"
import SimulationForm from "@/components/simulation-form"
import SimulationResults from "@/components/simulation-results"
import type { SimulationConfig, SimulationResult } from "@/lib/types"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ADULT_FEMALE_FERTILITY, AVERAGE_YIELD_KG_OF_VID_PER_HA, CONTROL_METHODS, DEGREE_DAYS_ACCUMULATED_PER_GENERATION, GRAPE_VARIETY, MONTHS, MORTALITY_RATE_LARVA } from "@/constants/constants"
import useNormalDistribution from "@/hooks/useNormalDitribution"
import usePseudorandomNumber from "@/hooks/usePseudorandomNumber"
import usePoissonDistribution from "@/hooks/usePoissonDistribution"
import useExponentialDistribution from "@/hooks/useExponentialDistribution"
import useUniformDistribution from "@/hooks/useUniformDistribution"



export default function Home() {
  const getNextRandomValue = usePseudorandomNumber()
  const generateNormal = useNormalDistribution()
  const generatePoisson = usePoissonDistribution()
  const generateExponential = useExponentialDistribution()
  const generateUniform = useUniformDistribution()

  const [results, setResults] = useState<SimulationResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  //Definimos algunas variables
  let qtyGenerationPests = 0
  let initialInfestation = false
  let totalEggsFirstGeneration = 0
  let totalEggsSecondGeneration = 0
  let totalEggsThirdGeneration = 0
  let totalEggsFourthGeneration = 0
  // const yieldRatePerHectare = 0
  let grossYieldRate = 0
  let netYieldRate = 0
  let hectareNumber = 0
  let totalDamage = 0

  //start variables to damage per generation
  let damageByFirstGeneration = 0
  let damageBySecondGeneration = 0
  let damageByThirdGeneration = 0
  let damageByFourthGeneration = 0

  function calculateDegreeDaysAcumulationPerMonth(monthKey: keyof typeof MONTHS): number {

    const month = MONTHS[monthKey];

    const days = month.DAYS;
    const media = month.CLIMATE.AVERAGE_TEMPERATURE;
    const desvio = month.CLIMATE.DESVIATION;
    const umbral = DEGREE_DAYS_ACCUMULATED_PER_GENERATION.UMBRAL;

    let acumulado = 0;
    for (let d = 0; d < days; d++) {
      const tempDia = generateNormal(media, desvio);
      if (tempDia > umbral) {
        acumulado += (tempDia - umbral);
      }
    }
    return acumulado;
  }

  function simulateDamageGeneration(quantityLarvaGeneration: number, damageAverageByLarva: number) {
    let damageByGneration = 0
    let larvaCount = 0
    while (larvaCount < quantityLarvaGeneration) {
      const damageByLarva = generatePoisson(damageAverageByLarva)
      // console.log("Daño x larva numero:", larvaCount, " es igual a: ", damageByLarva)
      damageByGneration += damageByLarva
      larvaCount++
    }
    return damageByGneration
  }

  function simulateEggsNextGeneration(quantityAdultGeneration: number): number {
    const eggsByEachAdult = generateNormal(ADULT_FEMALE_FERTILITY.AVERAGE, ADULT_FEMALE_FERTILITY.DESVIATION)
    const totalEggsByGeneration = quantityAdultGeneration * eggsByEachAdult / 2
    return Math.round(totalEggsByGeneration)
  }

  function simulateSurvivalByGeneration(totalEggsByGeneration: number, effectivityOfControlMethodMin: number, effectivityOfControlMethodMax: number) {
    const effectivityOfControlMethod = generateUniform(effectivityOfControlMethodMin, effectivityOfControlMethodMax)
    const mortalityRateOfGeneration = generateUniform(MORTALITY_RATE_LARVA.MIN_PERCENTAGE, MORTALITY_RATE_LARVA.MAX_PERCENTAGE)
    const quantityLarvaByGeneration = totalEggsByGeneration * (1 - mortalityRateOfGeneration) * (1 - effectivityOfControlMethod)
    return quantityLarvaByGeneration
  }

  const handleSimulate = (config: SimulationConfig) => {
    // console.log("config: ", config)
    setIsLoading(true)

    //---------------------------------------------------------------

    const typeOfVariety = GRAPE_VARIETY[config.grapeVariety.toUpperCase() as keyof typeof GRAPE_VARIETY]
    const controlMethodSelected = Object.entries(config.controlMethods).find(([_, value]) => value === true)?.[0] as keyof typeof CONTROL_METHODS

    const degreeDaysAcumulationPerMonth = typeOfVariety.MONTHS_OF_GROWTH.map((item) => {
      return {
        month: item,
        acumulation: calculateDegreeDaysAcumulationPerMonth(item.toUpperCase() as keyof typeof MONTHS)
      }
    })

    const degreeDaysAcumulation = {
      perMonth: degreeDaysAcumulationPerMonth,
      total: degreeDaysAcumulationPerMonth.reduce((acc, curr) => acc + curr.acumulation, 0),
    }
    // console.log("Degree Days Acumulation: ", degreeDaysAcumulation)

    

    while (hectareNumber < config.hectares) {
      // Calculate number of adult per hectare with Poisson method
      const qtyAdult = generatePoisson(config.initialInfestation)
      // console.log("qtyAdult: ", qtyAdult)

      //Check if qty adult is bigger than 1
      if (qtyAdult > 1) {
        console.log("Qty adult is: ", qtyAdult)

        // iterate adults
        let adultCount = 0
        while (adultCount < qtyAdult) {
          // generate randomNumber and check the probability of infestation with percentage of the vine selected
          const randomNumber = getNextRandomValue()
          // console.log("randomNumber", randomNumber)
          if (randomNumber <= typeOfVariety.EFFECTIVE_INFESTATION_PER_CLUSTER) {
            initialInfestation = true
            // calculate the qty of eggs by each adults
            const eggsByEachAdult = generateNormal(ADULT_FEMALE_FERTILITY.AVERAGE, ADULT_FEMALE_FERTILITY.DESVIATION)
            totalEggsFirstGeneration += eggsByEachAdult
          }

          adultCount++
        }
      }

      //Calculate yield per hectare with poisson
      const yieldRatePerHectare = generatePoisson(AVERAGE_YIELD_KG_OF_VID_PER_HA)
      grossYieldRate += yieldRatePerHectare

      hectareNumber++
    }

    //after finished the while in hectares check the initial infestion

    if (initialInfestation) {
      

      // Calculate the necessary degree days to start generation of larvas
      const necessaryDegreeDaysToStartGeneration = generateNormal(DEGREE_DAYS_ACCUMULATED_PER_GENERATION.AVERAGE, DEGREE_DAYS_ACCUMULATED_PER_GENERATION.DESVIATION)
      // console.log(necessaryDegreeDaysToStartGeneration)

      let degreeDaysCount = 0
      while (degreeDaysCount < degreeDaysAcumulation.total) {
        qtyGenerationPests++
        degreeDaysCount = degreeDaysCount + necessaryDegreeDaysToStartGeneration
      }

      const qtyAdultsFirtGeneration = simulateSurvivalByGeneration(
        totalEggsFirstGeneration,
        CONTROL_METHODS[controlMethodSelected.toUpperCase() as keyof typeof CONTROL_METHODS].EFFECTIVENESS_MIN,
        CONTROL_METHODS[controlMethodSelected.toUpperCase() as keyof typeof CONTROL_METHODS].EFFECTIVENESS_MAX)
      damageByFirstGeneration = simulateDamageGeneration(qtyAdultsFirtGeneration, typeOfVariety.DAMAGE_PER_GENERATION.FIRST_GENERATION)

      if (qtyGenerationPests > 1) {
        //Calculate second generation

        totalEggsSecondGeneration = simulateEggsNextGeneration(damageByFirstGeneration)
        const qtyAdultsSecondGeneration = simulateSurvivalByGeneration(
          totalEggsSecondGeneration,
          CONTROL_METHODS[controlMethodSelected.toUpperCase() as keyof typeof CONTROL_METHODS].EFFECTIVENESS_MIN,
          CONTROL_METHODS[controlMethodSelected.toUpperCase() as keyof typeof CONTROL_METHODS].EFFECTIVENESS_MAX)
        damageBySecondGeneration = simulateDamageGeneration(qtyAdultsSecondGeneration, typeOfVariety.DAMAGE_PER_GENERATION.SECOND_GENERATION)

      } else if (qtyGenerationPests > 2) {
        //Calculate third generation

        totalEggsThirdGeneration = simulateEggsNextGeneration(damageByFirstGeneration)
        const qtyAdultsThirdGeneration = simulateSurvivalByGeneration(
          totalEggsThirdGeneration,
          CONTROL_METHODS[controlMethodSelected.toUpperCase() as keyof typeof CONTROL_METHODS].EFFECTIVENESS_MIN,
          CONTROL_METHODS[controlMethodSelected.toUpperCase() as keyof typeof CONTROL_METHODS].EFFECTIVENESS_MAX)
        damageByThirdGeneration = simulateDamageGeneration(qtyAdultsThirdGeneration, typeOfVariety.DAMAGE_PER_GENERATION.THIRD_GENERATION)

      } else if (qtyGenerationPests > 3) {
        //Calculate fourth generation
        totalEggsFourthGeneration = simulateEggsNextGeneration(damageByFirstGeneration)
        const qtyAdultsFourthGeneration = simulateSurvivalByGeneration(
          totalEggsFourthGeneration,
          CONTROL_METHODS[controlMethodSelected.toUpperCase() as keyof typeof CONTROL_METHODS].EFFECTIVENESS_MIN,
          CONTROL_METHODS[controlMethodSelected.toUpperCase() as keyof typeof CONTROL_METHODS].EFFECTIVENESS_MAX)
        damageByFourthGeneration = simulateDamageGeneration(qtyAdultsFourthGeneration, typeOfVariety.DAMAGE_PER_GENERATION.FOURTH_GENERATION)
      }

      totalDamage = damageByFirstGeneration + damageBySecondGeneration + damageByThirdGeneration + damageByFourthGeneration
    } else {
      console.log("without Infestion")
    }

    //Calculate net yield rate with the gross and the damage
    console.log("Rendimiento Bruto: ", grossYieldRate)
    console.log("Daño Total:", totalDamage)
    netYieldRate = grossYieldRate - totalDamage
    console.log("Rendimiento neto", netYieldRate)

    // const simulationResults = runSimulation(config)
    // setResults(simulationResults)

    //---------------------------------------------------------------

    setIsLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <SimulationForm onSimulate={handleSimulate} isLoading={isLoading} />
          </div>
          <div className="lg:col-span-8">
            {results ? (
              <SimulationResults results={results} />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 h-full flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Bienvenido al Simulador de Lobesia Botrana
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Configure los parámetros de simulación en el panel izquierdo y haga clic en "Simular" para ver los
                    resultados del impacto de la plaga en sus viñedos.
                  </p>
                  <div className="flex justify-center">
                    <img src="/placeholder.svg?height=200&width=300" alt="Lobesia botrana" className="rounded-md" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}





/*

      //Calculate the efectivity of the control method selected
      const controlMethodSelected = Object.entries(config.controlMethods).find(([_, value]) => value === true)?.[0] as keyof typeof CONTROL_METHODS
      // console.log("Control method selected: ", controlMethodSelected)
      const effectivityOfControlMethod = generateUniform(
        CONTROL_METHODS[controlMethodSelected.toUpperCase() as keyof typeof CONTROL_METHODS].EFFECTIVENESS_MIN,
        CONTROL_METHODS[controlMethodSelected.toUpperCase() as keyof typeof CONTROL_METHODS].EFFECTIVENESS_MAX
      )
      // console.log("Effectivity of Control Method Selected: ", efectivityOfControlMethod)

      //Calculate the mortality rate of the generation
      const mortalityRateOfGeneration = generateUniform(MORTALITY_RATE_LARVA.MIN_PERCENTAGE, MORTALITY_RATE_LARVA.MAX_PERCENTAGE)
      // console.log(mortalityRateOfGeneration)

      // Calculate the quantity of the first larva generation taking into account the mortality and effectivity
      const quantityLarvaFirstGeneration = totalEggsFirstGeneration * (1 - mortalityRateOfGeneration) * (1 - effectivityOfControlMethod)
      // console.log(quantityLarvaFirstGeneration)

      // Go through each larva
      let larvaCount = 0
      while (larvaCount < quantityLarvaFirstGeneration) {
        // Calculate with Poisson damage by each larva
        // console.log(typeOfVariety.DAMAGE_PER_GENERATION.FIRST_GENERATION)
        const damageByLarva = generatePoisson(typeOfVariety.DAMAGE_PER_GENERATION.FIRST_GENERATION)
        // console.log("Daño x larva numero:", larvaCount, " es igual a: ", damageByLarva)
        damageByFirstGeneration += damageByLarva

        larvaCount++
      }
      // console.log("larvaCount: ", larvaCount)
      // console.log("damageByFirstGeneration: ",  damageByFirstGeneration)

      // Calculate data for the second generation---------------------------------------------
      // Calculate eggsByAdults
      const eggsByEachAdultSecondGeneration = generateNormal(ADULT_FEMALE_FERTILITY.AVERAGE, ADULT_FEMALE_FERTILITY.DESVIATION)
      // Calculate total eggs per adult in second generation - Divive in 2 because if we have 2 adult, one is female and another is masculine
      totalEggsSecondGeneration = (quantityLarvaFirstGeneration * eggsByEachAdultSecondGeneration) / 2

      const effectivityOfControlMethodSecondGeneration = generateUniform(
        CONTROL_METHODS[controlMethodSelected.toUpperCase() as keyof typeof CONTROL_METHODS].EFFECTIVENESS_MIN,
        CONTROL_METHODS[controlMethodSelected.toUpperCase() as keyof typeof CONTROL_METHODS].EFFECTIVENESS_MAX
      )
      // console.log("Effectivity of Control Method Selected: ", efectivityOfControlMethod)

      //Calculate the mortality rate of the generation
      const mortalityRateOfSecondGeneration = generateUniform(MORTALITY_RATE_LARVA.MIN_PERCENTAGE, MORTALITY_RATE_LARVA.MAX_PERCENTAGE)
      // console.log(mortalityRateOfGeneration)
      const quantityLarvaSecondGeneration = totalEggsSecondGeneration * (1 - mortalityRateOfSecondGeneration) * (1 - effectivityOfControlMethodSecondGeneration)
      // console.log(quantityLarvaFirstGeneration)
      let larvaSecondGenerationCount = 0
      while (larvaSecondGenerationCount < quantityLarvaSecondGeneration) {
        // Calculate with Poisson damage by each larva
        const damageByLarva = generatePoisson(typeOfVariety.DAMAGE_PER_GENERATION.SECOND_GENERATION)
        damageBySecondGeneration += damageByLarva

        larvaSecondGenerationCount++
      }
      // console.log("larvaSecondGenerationCount: ", larvaSecondGenerationCount)
      // console.log("damageBySecondGeneration: ",  damageBySecondGeneration)
      // Finish data of second Generation-------------------------------------------------------------


      // Calculate data for the third generation---------------------------------------------
      // Calculate eggsByAdults
      const eggsByEachAdultThirdGeneration = generateNormal(ADULT_FEMALE_FERTILITY.AVERAGE, ADULT_FEMALE_FERTILITY.DESVIATION)
      // Calculate total eggs per adult in second generation - Divive in 2 because if we have 2 adult, one is female and another is masculine
      totalEggsThirdGeneration = (quantityLarvaSecondGeneration * eggsByEachAdultThirdGeneration) / 2
      // console.log("totalEggsThirdGeneration", totalEggsThirdGeneration)

      const effectivityOfControlMethodThirdGeneration = generateUniform(
        CONTROL_METHODS[controlMethodSelected.toUpperCase() as keyof typeof CONTROL_METHODS].EFFECTIVENESS_MIN,
        CONTROL_METHODS[controlMethodSelected.toUpperCase() as keyof typeof CONTROL_METHODS].EFFECTIVENESS_MAX
      )
      // console.log("Effectivity of Control Method Selected: ", efectivityOfControlMethod)

      //Calculate the mortality rate of the generation
      const mortalityRateOfThirdGeneration = generateUniform(MORTALITY_RATE_LARVA.MIN_PERCENTAGE, MORTALITY_RATE_LARVA.MAX_PERCENTAGE)
      const quantityLarvaThirdGeneration = totalEggsThirdGeneration * (1 - mortalityRateOfThirdGeneration) * (1 - effectivityOfControlMethodThirdGeneration)

      let larvaThirdGenerationCount = 0
      while (larvaThirdGenerationCount < quantityLarvaThirdGeneration) {
        // Calculate with Poisson damage by each larva
        const damageByLarva = generatePoisson(typeOfVariety.DAMAGE_PER_GENERATION.THIRD_GENERATION)
        damageByThirdGeneration += damageByLarva

        larvaThirdGenerationCount++
      }
      // console.log("larvaThirdGenerationCount: ", larvaThirdGenerationCount)
      // console.log("larvaThirdGenerationCount: ",  damageByThirdGeneration)
      // Finish data of third Generation-------------------------------------------------------------

      // Calculate data for the fourth generation---------------------------------------------
      // Calculate eggsByAdults
      const eggsByEachAdultFourthGeneration = generateNormal(ADULT_FEMALE_FERTILITY.AVERAGE, ADULT_FEMALE_FERTILITY.DESVIATION)
      // Calculate total eggs per adult in second generation - Divive in 2 because if we have 2 adult, one is female and another is masculine
      totalEggsFourthGeneration = (quantityLarvaSecondGeneration * eggsByEachAdultFourthGeneration) / 2
      // console.log("totalEggsFourthGeneration", totalEggsFourthGeneration)

      const effectivityOfControlMethodFourthGeneration = generateUniform(
        CONTROL_METHODS[controlMethodSelected.toUpperCase() as keyof typeof CONTROL_METHODS].EFFECTIVENESS_MIN,
        CONTROL_METHODS[controlMethodSelected.toUpperCase() as keyof typeof CONTROL_METHODS].EFFECTIVENESS_MAX
      )
      // console.log("Effectivity of Control Method Selected: ", efectivityOfControlMethod)

      //Calculate the mortality rate of the generation
      const mortalityRateOfFourthGeneration = generateUniform(MORTALITY_RATE_LARVA.MIN_PERCENTAGE, MORTALITY_RATE_LARVA.MAX_PERCENTAGE)
      const quantityLarvaFourthGeneration = totalEggsFourthGeneration * (1 - mortalityRateOfFourthGeneration) * (1 - effectivityOfControlMethodFourthGeneration)

      let larvaFourthGenerationCount = 0
      while (larvaFourthGenerationCount < quantityLarvaFourthGeneration) {
        // Calculate with Poisson damage by each larva
        const damageByLarva = generatePoisson(typeOfVariety.DAMAGE_PER_GENERATION.FOURTH_GENERATION)
        damageByFourthGeneration += damageByLarva

        larvaFourthGenerationCount++
      }
      // console.log("larvaFourthGenerationCount: ", larvaFourthGenerationCount)
      // console.log("larvaFourthGenerationCount: ",  damageByFourthGeneration)
      // Finish data of third Generation-------------------------------------------------------------
      totalDamage = damageByFirstGeneration + damageBySecondGeneration + damageByThirdGeneration + damageByFourthGeneration


*/