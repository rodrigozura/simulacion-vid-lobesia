export interface SimulationConfig {
  grapeVariety: string
  hectares: number
  initialInfestation: number
  controlMethods: {
    pheromone_Traps: boolean
    mating_Disruption: boolean
    insecticides: boolean
    sterile_Insect_Technique: boolean
  }
}

export interface GenerationImpact {
  generation1: number
  generation2: number
  generation3: number
  generation4: number
}

export interface ControlEffectiveness {
  generation1: number
  generation2: number
  generation3: number
  generation4: number
}

export interface EconomicImpact {
  lossWithoutControl: number
  lossWithControl: number
  controlCosts: number
  netBenefit: number
  returnOnInvestment: number
  costPerHectare: number
  methodCosts: {
    pheromone_Traps: number
    mating_Disruption: number
    insecticides: number
    sterile_Insect_Technique: number
  }
}

export interface SimulationResult {
  grapeVariety: string
  yieldPerHectare: number
  baseYieldPerHectare: number
  yieldLoss: number
  acidityQuality?: number
  qualityLoss?: number
  generationImpact: GenerationImpact
  controlEffectiveness: ControlEffectiveness
  recommendations: string[]
  economicImpact?: EconomicImpact
  controlMethodSelected: string
}
