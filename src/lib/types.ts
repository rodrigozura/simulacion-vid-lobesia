export interface SimulationConfig {
  grapeVariety: string
  hectares: number
  initialInfestation: number
  temperature: number
  humidity: number
  controlMethods: {
    pheromoneTraps: boolean
    matingDisruption: boolean
    insecticides: boolean
    sterileInsectTechnique: boolean
  }
  controlIntensity: {
    pheromoneTraps: number
    matingDisruption: number
    insecticides: number
    sterileInsectTechnique: number
  }
}

export interface GenerationImpact {
  generation1: number
  generation2: number
  generation3: number
}

export interface ControlEffectiveness {
  pheromoneTraps: number
  matingDisruption: number
  insecticides: number
  sterileInsectTechnique: number
}

export interface EconomicImpact {
  lossWithoutControl: number
  lossWithControl: number
  controlCosts: number
  netBenefit: number
  returnOnInvestment: number
  costPerHectare: number
  methodCosts: {
    pheromoneTraps: number
    matingDisruption: number
    insecticides: number
    sterileInsectTechnique: number
  }
}

export interface SimulationResult {
  grapeVariety: string
  yieldPerHectare: number
  baseYieldPerHectare: number
  yieldLoss: number
  acidityQuality: number
  qualityLoss: number
  generationImpact: GenerationImpact
  controlEffectiveness: ControlEffectiveness
  recommendations: string[]
  economicImpact: EconomicImpact
}
