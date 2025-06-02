"use client"

import type React from "react"

import { useState } from "react"
import type { SimulationConfig } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

interface SimulationFormProps {
  onSimulate: (config: SimulationConfig) => void
  isLoading: boolean
}

export default function SimulationForm({ onSimulate, isLoading }: SimulationFormProps) {
  const [config, setConfig] = useState<SimulationConfig>({
    grapeVariety: "malbec",
    hectares: 1000,
    initialInfestation: 0.2,
    controlMethods: {
      pheromone_Traps: true,
      mating_Disruption: false,
      insecticides: false,
      sterile_Insect_Technique: false,
    },
  })

  const handleControlMethodToggle = (method: keyof SimulationConfig["controlMethods"]) => {
    setConfig({
      ...config,
      controlMethods: {
        ...config.controlMethods,
        [method]: !config.controlMethods[method],
      },
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSimulate(config)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="shadow-md">
        <CardHeader className="bg-green-700 text-white rounded-t-lg">
          <CardTitle className="text-lg">Configuración de la Simulación</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Sección: Datos de Viñedo */}
          <h3 className="text-md font-semibold text-green-800 mb-2">Datos de Viñedo</h3>
          <p className="text-sm text-gray-600 mb-4">Ingrese la información básica de su viñedo para personalizar la simulación según sus características productivas.</p>
          <div className="space-y-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="grape-variety">Variedad de Uva</Label>
              <Select
                value={config.grapeVariety}
                onValueChange={(value) => setConfig({ ...config, grapeVariety: value })}
              >
                <SelectTrigger id="grape-variety" className="text-sm font-normal text-gray-700">
                  <SelectValue placeholder="Seleccione variedad" className="text-sm font-normal text-gray-700" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="malbec" className="text-sm font-normal text-gray-700">Malbec</SelectItem>
                  <SelectItem value="torrontes" className="text-sm font-normal text-gray-700">Torrontés Riojano</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="hectares">Cantidad de hectáreas cultivadas</Label>
                <span className="text-sm text-gray-500">{config.hectares} ha</span>
              </div>
              <Slider
                id="hectares"
                min={1}
                max={10000}
                step={1}
                value={[config.hectares]}
                onValueChange={(value) => setConfig({ ...config, hectares: value[0] })}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="initial-infestation">Cantidad de adultos por ha</Label>
                <span className="text-sm text-gray-500">{config.initialInfestation.toFixed(1)}</span>
              </div>
              <Slider
                id="initial-infestation"
                min={0}
                max={10}
                step={0.1}
                value={[config.initialInfestation]}
                onValueChange={(value) => setConfig({ ...config, initialInfestation: Number(value[0].toFixed(1)) })}
              />
            </div>
          </div>
          <div className="h-px bg-gray-300 my-6" />
          {/* Sección: Datos de Control */}
          <h3 className="text-md font-semibold text-green-800 mb-2">Datos de Control</h3>
          <p className="text-sm text-gray-600 mb-4">Seleccione el método de control que aplica en su viñedo.</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="pheromone-traps">Trampas de Feromonas</Label>
                <p className="text-sm text-gray-500">Monitoreo y captura de adultos</p>
              </div>
              <Switch
                id="pheromone-traps"
                checked={config.controlMethods.pheromone_Traps}
                onCheckedChange={() => {
                  setConfig({
                    ...config,
                    controlMethods: {
                      pheromone_Traps: true,
                      mating_Disruption: false,
                      insecticides: false,
                      sterile_Insect_Technique: false
                    }
                  })
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="mating-disruption">Confusión Sexual</Label>
                <p className="text-sm text-gray-500">Difusores de feromonas</p>
              </div>
              <Switch
                id="mating-disruption"
                checked={config.controlMethods.mating_Disruption}
                onCheckedChange={() => {
                  setConfig({
                    ...config,
                    controlMethods: {
                      pheromone_Traps: false,
                      mating_Disruption: true,
                      insecticides: false,
                      sterile_Insect_Technique: false
                    }
                  })
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="insecticides">Insecticidas</Label>
                <p className="text-sm text-gray-500">Control químico</p>
              </div>
              <Switch
                id="insecticides"
                checked={config.controlMethods.insecticides}
                onCheckedChange={() => {
                  setConfig({
                    ...config,
                    controlMethods: {
                      pheromone_Traps: false,
                      mating_Disruption: false,
                      insecticides: true,
                      sterile_Insect_Technique: false
                    }
                  })
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sterile-insect">Técnica del Insecto Estéril</Label>
                <p className="text-sm text-gray-500">Liberación de machos estériles</p>
              </div>
              <Switch
                id="sterile-insect"
                checked={config.controlMethods.sterile_Insect_Technique}
                onCheckedChange={() => {
                  setConfig({
                    ...config,
                    controlMethods: {
                      pheromone_Traps: false,
                      mating_Disruption: false,
                      insecticides: false,
                      sterile_Insect_Technique: true
                    }
                  })
                }}
              />
            </div>
          </div>
          <div className="mt-6">
            <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Simulando...
                </>
              ) : (
                "Simular"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
