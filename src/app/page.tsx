"use client"

import { useState } from "react"
import SimulationForm from "@/components/simulation-form"
import SimulationResults from "@/components/simulation-results"
import type { SimulationConfig, SimulationResult } from "@/lib/types"
import { runSimulation } from "@/lib/simulation"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Home() {
  const [results, setResults] = useState<SimulationResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSimulate = (config: SimulationConfig) => {
    setIsLoading(true)
    // Simular un pequeño retraso para dar sensación de procesamiento
    setTimeout(() => {
      const simulationResults = runSimulation(config)
      setResults(simulationResults)
      setIsLoading(false)
    }, 1000)
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
