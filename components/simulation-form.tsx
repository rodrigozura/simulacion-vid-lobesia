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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

interface SimulationFormProps {
  onSimulate: (config: SimulationConfig) => void
  isLoading: boolean
}

export default function SimulationForm({ onSimulate, isLoading }: SimulationFormProps) {
  const [config, setConfig] = useState<SimulationConfig>({
    grapeVariety: "malbec",
    hectares: 10,
    initialInfestation: 10,
    temperature: 25,
    humidity: 50,
    controlMethods: {
      pheromoneTraps: false,
      matingDisruption: false,
      insecticides: false,
      sterileInsectTechnique: false,
    },
    controlIntensity: {
      pheromoneTraps: 50,
      matingDisruption: 50,
      insecticides: 50,
      sterileInsectTechnique: 50,
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

  const handleControlIntensityChange = (method: keyof SimulationConfig["controlIntensity"], value: number[]) => {
    setConfig({
      ...config,
      controlIntensity: {
        ...config.controlIntensity,
        [method]: value[0],
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
          <Tabs defaultValue="vineyard" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="vineyard">Viñedo</TabsTrigger>
              <TabsTrigger value="control">Control</TabsTrigger>
            </TabsList>

            <TabsContent value="vineyard" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="grape-variety">Variedad de Uva</Label>
                  <Select
                    value={config.grapeVariety}
                    onValueChange={(value) => setConfig({ ...config, grapeVariety: value })}
                  >
                    <SelectTrigger id="grape-variety">
                      <SelectValue placeholder="Seleccione variedad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="malbec">Malbec</SelectItem>
                      <SelectItem value="torrontes">Torrontés Riojano</SelectItem>
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
                    max={100}
                    step={1}
                    value={[config.hectares]}
                    onValueChange={(value) => setConfig({ ...config, hectares: value[0] })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="initial-infestation">Infestación Inicial (%)</Label>
                    <span className="text-sm text-gray-500">{config.initialInfestation}%</span>
                  </div>
                  <Slider
                    id="initial-infestation"
                    min={0}
                    max={100}
                    step={1}
                    value={[config.initialInfestation]}
                    onValueChange={(value) => setConfig({ ...config, initialInfestation: value[0] })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="temperature">Temperatura Media (°C)</Label>
                    <span className="text-sm text-gray-500">{config.temperature}°C</span>
                  </div>
                  <Slider
                    id="temperature"
                    min={15}
                    max={35}
                    step={1}
                    value={[config.temperature]}
                    onValueChange={(value) => setConfig({ ...config, temperature: value[0] })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="humidity">Humedad Relativa (%)</Label>
                    <span className="text-sm text-gray-500">{config.humidity}%</span>
                  </div>
                  <Slider
                    id="humidity"
                    min={20}
                    max={80}
                    step={1}
                    value={[config.humidity]}
                    onValueChange={(value) => setConfig({ ...config, humidity: value[0] })}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="control" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pheromone-traps">Trampas de Feromonas</Label>
                    <p className="text-sm text-gray-500">Monitoreo y captura de adultos</p>
                  </div>
                  <Switch
                    id="pheromone-traps"
                    checked={config.controlMethods.pheromoneTraps}
                    onCheckedChange={() => handleControlMethodToggle("pheromoneTraps")}
                  />
                </div>

                {config.controlMethods.pheromoneTraps && (
                  <div className="pl-6 space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="pheromone-traps-intensity">Intensidad</Label>
                      <span className="text-sm text-gray-500">{config.controlIntensity.pheromoneTraps}%</span>
                    </div>
                    <Slider
                      id="pheromone-traps-intensity"
                      min={10}
                      max={100}
                      step={5}
                      value={[config.controlIntensity.pheromoneTraps]}
                      onValueChange={(value) => handleControlIntensityChange("pheromoneTraps", value)}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="mating-disruption">Confusión Sexual</Label>
                    <p className="text-sm text-gray-500">Difusores de feromonas</p>
                  </div>
                  <Switch
                    id="mating-disruption"
                    checked={config.controlMethods.matingDisruption}
                    onCheckedChange={() => handleControlMethodToggle("matingDisruption")}
                  />
                </div>

                {config.controlMethods.matingDisruption && (
                  <div className="pl-6 space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="mating-disruption-intensity">Intensidad</Label>
                      <span className="text-sm text-gray-500">{config.controlIntensity.matingDisruption}%</span>
                    </div>
                    <Slider
                      id="mating-disruption-intensity"
                      min={10}
                      max={100}
                      step={5}
                      value={[config.controlIntensity.matingDisruption]}
                      onValueChange={(value) => handleControlIntensityChange("matingDisruption", value)}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="insecticides">Insecticidas</Label>
                    <p className="text-sm text-gray-500">Control químico</p>
                  </div>
                  <Switch
                    id="insecticides"
                    checked={config.controlMethods.insecticides}
                    onCheckedChange={() => handleControlMethodToggle("insecticides")}
                  />
                </div>

                {config.controlMethods.insecticides && (
                  <div className="pl-6 space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="insecticides-intensity">Intensidad</Label>
                      <span className="text-sm text-gray-500">{config.controlIntensity.insecticides}%</span>
                    </div>
                    <Slider
                      id="insecticides-intensity"
                      min={10}
                      max={100}
                      step={5}
                      value={[config.controlIntensity.insecticides]}
                      onValueChange={(value) => handleControlIntensityChange("insecticides", value)}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sterile-insect">Técnica del Insecto Estéril</Label>
                    <p className="text-sm text-gray-500">Liberación de machos estériles</p>
                  </div>
                  <Switch
                    id="sterile-insect"
                    checked={config.controlMethods.sterileInsectTechnique}
                    onCheckedChange={() => handleControlMethodToggle("sterileInsectTechnique")}
                  />
                </div>

                {config.controlMethods.sterileInsectTechnique && (
                  <div className="pl-6 space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="sterile-insect-intensity">Intensidad</Label>
                      <span className="text-sm text-gray-500">{config.controlIntensity.sterileInsectTechnique}%</span>
                    </div>
                    <Slider
                      id="sterile-insect-intensity"
                      min={10}
                      max={100}
                      step={5}
                      value={[config.controlIntensity.sterileInsectTechnique]}
                      onValueChange={(value) => handleControlIntensityChange("sterileInsectTechnique", value)}
                    />
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

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
