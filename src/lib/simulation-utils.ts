import type { SimulationConfig, SimulationResult } from "./types"
import { MONTHS, DEGREE_DAYS_ACCUMULATED_PER_GENERATION, GRAPE_VARIETY } from "../constants/constants";
import useNormalDistribution from "../hooks/useNormalDitribution";


export function generateRecommendations(
  config: SimulationConfig,
  yieldLoss: number,
  generationImpact: { generation1: number; generation2: number; generation3: number; generation4: number },
): string[] {
  const recommendations: string[] = []
  const varietyName = config.grapeVariety === "malbec" ? "Malbec" : "Torrontés Riojano"

  // Si la pérdida es menor al 10%, solo mostrar una recomendación general
  if (yieldLoss < 10) {
    recommendations.push(
      `La pérdida de rendimiento proyectada (${(yieldLoss).toFixed(1)}%) es aceptable y no requiere intensificar o modificar los métodos de control actuales. Se recomienda mantener el monitoreo regular para detectar cambios en la población de la plaga.`
    )
    return recommendations
  }

  // Recomendación principal basada en nivel de infestación
  if (yieldLoss > 40) {
    recommendations.push(
      `Implementar urgentemente un programa de control integrado para ${varietyName}. La pérdida proyectada de rendimiento (${(yieldLoss).toFixed(1)}%) requiere acción inmediata.`,
    )
  } else if (yieldLoss > 20) {
    recommendations.push(
      `Aplicar un programa de control moderado para ${varietyName}. La pérdida proyectada de rendimiento (${(yieldLoss).toFixed(1)}%) puede reducirse significativamente con el método de control adecuado.`,
    )
  } else {
    recommendations.push(
      `Mantener un programa de monitoreo regular para ${varietyName}. La pérdida proyectada de rendimiento (${(yieldLoss).toFixed(1)}%) es manejable con intervenciones mínimas.`,
    )
  }

  // Recomendaciones específicas por generación
  const maxGeneration = Math.max(
    generationImpact.generation1,
    generationImpact.generation2,
    generationImpact.generation3,
    generationImpact.generation4
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

  if (maxGeneration === generationImpact.generation4 && generationImpact.generation4 > 10) {
    recommendations.push(
      `Implementar medidas de control específicas para la 4ª generación (maduración tardía) mediante la combinación de confusión sexual y aplicaciones de productos de bajo impacto, priorizando la protección de la calidad final del vino.`,
    )
  }

  // Recomendaciones específicas por método de control seleccionado
  const selectedMethod = Object.entries(config.controlMethods).find(([_, value]) => value === true)?.[0]

  if (selectedMethod === "pheromone_Traps") {
    recommendations.push(
      `Optimizar el uso de trampas de feromonas instalando 1 trampa cada 3-5 hectáreas para detectar los picos de vuelo y optimizar el momento de las intervenciones.`,
    )
  } else if (selectedMethod === "mating_Disruption") {
    recommendations.push(
      `Implementar confusión sexual como método principal de control. Es altamente efectivo y compatible con producción orgánica, especialmente para ${varietyName}.`,
    )
  } else if (selectedMethod === "insecticides") {
    recommendations.push(
      `Utilizar insecticidas específicos para Lobesia botrana, aplicándolos en el momento óptimo según el monitoreo de vuelo y respetando los períodos de carencia.`,
    )
  } else if (selectedMethod === "sterile_Insect_Technique") {
    recommendations.push(
      `Implementar la técnica del insecto estéril, liberando machos estériles en momentos estratégicos para reducir la población de la plaga de manera sostenible.`,
    )
  }

  return recommendations
}