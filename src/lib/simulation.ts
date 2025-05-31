import type { SimulationConfig, SimulationResult } from "./types"

export function runSimulation(config: SimulationConfig): SimulationResult {
  // Factores base de impacto según variedad
  const baseFactors = {
    malbec: {
      baseYield: 9600, // kg/ha para Malbec
      yieldImpact: 0.6,
      qualityImpact: 0.7,
      generationImpact: { gen1: 0.2, gen2: 0.3, gen3: 0.5 },
      economicValue: 2500, // valor por hectárea en dólares
    },
    torrontes: {
      baseYield: 11500, // kg/ha para Torrontés Riojano
      yieldImpact: 0.7,
      qualityImpact: 0.8,
      generationImpact: { gen1: 0.15, gen2: 0.35, gen3: 0.5 },
      economicValue: 2200, // valor por hectárea en dólares
    },
  }

  // Costos base de métodos de control por hectárea
  const controlCosts = {
    pheromoneTraps: 120,
    matingDisruption: 350,
    insecticides: 180,
    sterileInsectTechnique: 450,
  }

  // Efectividad base de métodos de control
  const controlEffectiveness = {
    pheromoneTraps: 0.3,
    matingDisruption: 0.7,
    insecticides: 0.6,
    sterileInsectTechnique: 0.8,
  }

  // Seleccionar factores según variedad
  const factors = config.grapeVariety === "malbec" ? baseFactors.malbec : baseFactors.torrontes

  // Calcular impacto de infestación inicial
  const infestationFactor = config.initialInfestation / 100

  // Ajustar por factores climáticos
  const temperatureFactor = calculateTemperatureFactor(config.temperature)
  const humidityFactor = calculateHumidityFactor(config.humidity)
  const climateFactor = (temperatureFactor + humidityFactor) / 2

  // Ajustar por edad de la vid
  const ageFactorYield = calculateAgeFactorYield(config.vineAge)
  const ageFactorQuality = calculateAgeFactorQuality(config.vineAge)

  // Calcular efectividad total de control
  let totalControlEffectiveness = 0
  let totalControlCost = 0
  const appliedControlEffectiveness: Record<string, number> = {
    pheromoneTraps: 0,
    matingDisruption: 0,
    insecticides: 0,
    sterileInsectTechnique: 0,
  }

  // Para cada método de control activo, calcular su efectividad y costo
  Object.entries(config.controlMethods).forEach(([method, isActive]) => {
    if (isActive) {
      const methodKey = method as keyof typeof controlEffectiveness
      const intensity = config.controlIntensity[methodKey] / 100
      const effectiveness = controlEffectiveness[methodKey] * intensity

      // Aplicar efectividad con rendimientos decrecientes para métodos combinados
      totalControlEffectiveness = totalControlEffectiveness + effectiveness * (1 - totalControlEffectiveness * 0.3)

      // Calcular costo ajustado por intensidad
      const cost = controlCosts[methodKey] * (0.7 + intensity * 0.3)
      totalControlCost += cost

      // Guardar efectividad individual para mostrar en resultados
      appliedControlEffectiveness[methodKey] = effectiveness * 100
    }
  })

  // Limitar efectividad total a un máximo de 95%
  totalControlEffectiveness = Math.min(totalControlEffectiveness, 0.95)

  // Calcular impacto por generación
  const gen1Impact =
    factors.generationImpact.gen1 * infestationFactor * climateFactor * (1 - totalControlEffectiveness * 0.9)
  const gen2Impact =
    factors.generationImpact.gen2 * infestationFactor * climateFactor * (1 - totalControlEffectiveness * 0.8)
  const gen3Impact =
    factors.generationImpact.gen3 * infestationFactor * climateFactor * (1 - totalControlEffectiveness * 0.7)

  // Calcular pérdidas totales
  const rawYieldLoss = (gen1Impact + gen2Impact + gen3Impact) * 100 * factors.yieldImpact * ageFactorYield
  const rawQualityLoss =
    (gen1Impact * 0.2 + gen2Impact * 0.3 + gen3Impact * 0.5) * 100 * factors.qualityImpact * ageFactorQuality

  // Limitar pérdidas a un máximo de 100%
  const yieldLoss = Math.min(rawYieldLoss, 100)
  const qualityLoss = Math.min(rawQualityLoss, 100)

  // Calcular impacto económico
  const potentialValue = factors.economicValue
  const lossWithoutControl = potentialValue * (infestationFactor * climateFactor * 0.8)
  const lossWithControl = potentialValue * (yieldLoss / 100) * 0.8
  const netBenefit = lossWithoutControl - lossWithControl - totalControlCost
  const returnOnInvestment = totalControlCost > 0 ? (lossWithoutControl - lossWithControl) / totalControlCost : 0

  // Generar recomendaciones
  const recommendations = generateRecommendations(config, yieldLoss, qualityLoss, {
    generation1: gen1Impact * 100,
    generation2: gen2Impact * 100,
    generation3: gen3Impact * 100,
  })

  // Calcular rendimiento por hectárea
  const baseYieldPerHectare = factors.baseYield
  const actualYieldPerHectare = Math.round(baseYieldPerHectare * (1 - yieldLoss / 100))

  // Calcular calidad enológica (acidez apta comercialmente)
  const baseAcidityQuality = 95 // Porcentaje base de uvas con acidez apta
  const actualAcidityQuality = Math.max(0, baseAcidityQuality - qualityLoss * 0.8)

  return {
    grapeVariety: config.grapeVariety,
    yieldLoss,
    baseYieldPerHectare,
    yieldPerHectare: actualYieldPerHectare,
    acidityQuality: Math.round(actualAcidityQuality * 10) / 10,
    qualityLoss,
    generationImpact: {
      generation1: Math.round(gen1Impact * 100 * 10) / 10,
      generation2: Math.round(gen2Impact * 100 * 10) / 10,
      generation3: Math.round(gen3Impact * 100 * 10) / 10,
    },
    controlEffectiveness: {
      pheromoneTraps: Math.round(appliedControlEffectiveness.pheromoneTraps * 10) / 10,
      matingDisruption: Math.round(appliedControlEffectiveness.matingDisruption * 10) / 10,
      insecticides: Math.round(appliedControlEffectiveness.insecticides * 10) / 10,
      sterileInsectTechnique: Math.round(appliedControlEffectiveness.sterileInsectTechnique * 10) / 10,
    },
    recommendations,
  }
}

// Funciones auxiliares para cálculos

function calculateTemperatureFactor(temperature: number): number {
  // Temperatura óptima para Lobesia botrana: 25-28°C
  if (temperature >= 25 && temperature <= 28) {
    return 1.0 // Condiciones óptimas
  } else if (temperature < 15 || temperature > 35) {
    return 0.3 // Condiciones desfavorables
  } else if (temperature < 20 || temperature > 30) {
    return 0.6 // Condiciones subóptimas
  } else {
    return 0.8 // Condiciones buenas
  }
}

function calculateHumidityFactor(humidity: number): number {
  // Humedad óptima para Lobesia botrana: 40-70%
  if (humidity >= 40 && humidity <= 70) {
    return 1.0 // Condiciones óptimas
  } else if (humidity < 30 || humidity > 80) {
    return 0.5 // Condiciones desfavorables
  } else {
    return 0.8 // Condiciones subóptimas
  }
}

function calculateAgeFactorYield(age: number): number {
  // Vides jóvenes (3-10 años) son más resistentes
  if (age < 10) {
    return 0.8
  }
  // Vides maduras (10-20 años) tienen resistencia normal
  else if (age <= 20) {
    return 1.0
  }
  // Vides viejas (>20 años) son más susceptibles
  else {
    return 1.2
  }
}

function calculateAgeFactorQuality(age: number): number {
  // Vides jóvenes tienen menor impacto en calidad
  if (age < 10) {
    return 0.9
  }
  // Vides maduras tienen impacto normal en calidad
  else if (age <= 20) {
    return 1.0
  }
  // Vides viejas tienen mayor impacto en calidad
  else {
    return 1.1
  }
}

function generateRecommendations(
  config: SimulationConfig,
  yieldLoss: number,
  qualityLoss: number,
  generationImpact: { generation1: number; generation2: number; generation3: number },
): string[] {
  const recommendations: string[] = []
  const varietyName = config.grapeVariety === "malbec" ? "Malbec" : "Torrontés Riojano"

  // Recomendación principal basada en nivel de infestación
  if (yieldLoss > 40) {
    recommendations.push(
      `Implementar urgentemente un programa de control integrado para ${varietyName}. La pérdida proyectada de rendimiento (${Math.round(yieldLoss)}%) requiere acción inmediata combinando múltiples métodos de control.`,
    )
  } else if (yieldLoss > 20) {
    recommendations.push(
      `Aplicar un programa de control moderado para ${varietyName}. La pérdida proyectada de rendimiento (${Math.round(yieldLoss)}%) puede reducirse significativamente con métodos de control adecuados.`,
    )
  } else {
    recommendations.push(
      `Mantener un programa de monitoreo regular para ${varietyName}. La pérdida proyectada de rendimiento (${Math.round(yieldLoss)}%) es manejable con intervenciones mínimas.`,
    )
  }

  // Recomendaciones específicas por generación
  const maxGeneration = Math.max(
    generationImpact.generation1,
    generationImpact.generation2,
    generationImpact.generation3,
  )

  if (maxGeneration === generationImpact.generation1 && generationImpact.generation1 > 10) {
    recommendations.push(
      `Priorizar el control temprano en la fase de floración (1ª generación) mediante trampas de monitoreo intensivo y aplicaciones preventivas de Bacillus thuringiensis, que es efectivo contra larvas jóvenes sin afectar la calidad.`,
    )
  }

  if (maxGeneration === generationImpact.generation2 && generationImpact.generation2 > 10) {
    recommendations.push(
      `Enfocarse en la 2ª generación (fase de cuaje) implementando confusión sexual antes de la aparición de adultos y aplicando insecticidas específicos en el momento óptimo según el monitoreo de vuelo.`,
    )
  }

  if (maxGeneration === generationImpact.generation3 && generationImpact.generation3 > 10) {
    recommendations.push(
      `Controlar la 3ª generación (envero-maduración) mediante confusión sexual complementada con aplicaciones de productos compatibles con la proximidad a cosecha, y considerar adelantar la vendimia si el daño es severo.`,
    )
  }

  // Recomendaciones específicas por método de control
  if (!config.controlMethods.matingDisruption && yieldLoss > 15) {
    recommendations.push(
      `Implementar confusión sexual como método principal de control. Es altamente efectivo y compatible con producción orgánica, especialmente para ${varietyName}.`,
    )
  }

  if (!config.controlMethods.pheromoneTraps) {
    recommendations.push(
      `Instalar trampas de feromonas para monitoreo (1 trampa cada 3-5 hectáreas) para detectar los picos de vuelo y optimizar el momento de las intervenciones.`,
    )
  }

  if (config.controlMethods.insecticides && qualityLoss > 20) {
    recommendations.push(
      `Complementar los insecticidas con métodos biológicos para reducir residuos y preservar la calidad enológica del ${varietyName}, especialmente importante para la exportación.`,
    )
  }

  return recommendations
}
