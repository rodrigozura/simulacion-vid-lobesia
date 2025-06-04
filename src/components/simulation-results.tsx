"use client"

import type { SimulationResult, SimulationConfig } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle, Info } from "lucide-react"

interface SimulationResultsProps {
  results: SimulationResult
}

const COLORS = ["#4CAF50", "#FFC107", "#F44336", "#9C27B0"]

export default function SimulationResults({ results }: SimulationResultsProps) {
  const {
    grapeVariety,
    yieldLoss,
    yieldPerHectare,
    baseYieldPerHectare,
    generationImpact,
    controlEffectiveness,
    recommendations,
    economicImpact,
    controlMethodSelected,
  } = results

  const varietyName = grapeVariety === "malbec" ? "Malbec" : "Torrontés Riojano"
  // const yieldPercentage = 100 - yieldLoss

  const severityLevel = () => {
    if (yieldLoss < 15) return "Bajo"
    if (yieldLoss < 30) return "Moderado"
    if (yieldLoss < 50) return "Alto"
    return "Severo"
  }

  const severityColor = () => {
    if (yieldLoss < 15) return "bg-green-100 text-green-800"
    if (yieldLoss < 30) return "bg-yellow-100 text-yellow-800"
    if (yieldLoss < 50) return "bg-orange-100 text-orange-800"
    return "bg-red-100 text-red-800"
  }

  const generationData = [
    { name: "1ª Gen (Floración)", impacto: generationImpact.generation1 },
    { name: "2ª Gen (Cuaje)", impacto: generationImpact.generation2 },
    { name: "3ª Gen (Envero)", impacto: generationImpact.generation3 },
    { name: "4ª Gen (Maduración)", impacto: generationImpact.generation4 },
  ]

  const controlData = Object.entries(controlEffectiveness).map(([key, value]) => {
    const methodNames: Record<string, string> = {
      pheromoneTraps: "Trampas de Feromonas",
      matingDisruption: "Confusión Sexual",
      insecticides: "Insecticidas",
      sterileInsectTechnique: "Técnica Insecto Estéril",
    }

    return {
      name: methodNames[key],
      efectividad: value,
    }
  })

  return (
    <div className="space-y-6 simulation-results">
      <Card className="shadow-md">
        <CardHeader className="bg-green-700 text-white rounded-t-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <CardTitle className="text-lg">Resultados de la Simulación - {varietyName}</CardTitle>
            <div className="self-end sm:self-auto">
              <Badge className={`${severityColor()} whitespace-nowrap`}>
                Impacto: {severityLevel()}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="summary">Resumen</TabsTrigger>
              <TabsTrigger value="impact">Impacto</TabsTrigger>
              <TabsTrigger value="effectiveness">
                <span className="hidden sm:inline">Efectividad de Control</span>
                <span className="sm:hidden">Efectividad</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <h3 className="text-lg font-semibold text-amber-800 mb-2">Rendimiento Productivo por Ha (kg/ha)</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Pérdida de rendimiento:</span>
                    <span className="font-bold text-red-600">{yieldLoss.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-gray-600">Rendimiento base:</span>
                    <span className="font-bold text-green-600">{results.baseYieldPerHectare} kg/ha</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-gray-600">Rendimiento esperado:</span>
                    <span className="font-bold text-green-600">{results.yieldPerHectare} kg/ha</span>
                  </div>
                  <div className="mt-4 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: `${yieldLoss}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 mt-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Impacto por Generación</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={generationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: "Impacto (%)", angle: -90, position: "insideLeft" }} />
                      <Tooltip formatter={(value: number) => [`${value}%`, "Impacto"]} />
                      <Bar dataKey="impacto" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <Alert className="mt-4">
                <Info className="h-4 w-4" />
                <AlertTitle>Recomendación Principal</AlertTitle>
                <AlertDescription>{recommendations[0]}</AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="impact" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Impacto por Generación</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={generationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: "Impacto (%)", angle: -90, position: "insideLeft" }} />
                      <Tooltip  formatter={(value: number) => [`${value}%`, "Impacto"]} />
                      <Legend />
                      <Bar dataKey="impacto" fill="#8884d8" name="Impacto (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">1ª Generación (Floración)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        Impacto: <span className="font-bold">{generationImpact.generation1}%</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Afecta principalmente a las flores y botones florales, reduciendo el cuaje inicial.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">2ª Generación (Cuaje)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        Impacto: <span className="font-bold">{generationImpact.generation2}%</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Daña las bayas verdes en desarrollo, causando pérdidas directas de frutos.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">3ª Generación (Envero)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        Impacto: <span className="font-bold">{generationImpact.generation3}%</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Ataca las bayas maduras, causando podredumbres y afectando severamente la calidad.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">4ª Generación (Maduración)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        Impacto: <span className="font-bold">{generationImpact.generation4}%</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Afecta a las bayas en etapa final de maduración, aumentando el riesgo de podredumbres y pérdidas de calidad.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Alert className="mt-2">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Información Importante</AlertTitle>
                  <AlertDescription>
                    La 3ª generación suele causar el mayor daño cualitativo debido a la podredumbre secundaria
                    (Botrytis) que facilita en las bayas maduras.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>

            <TabsContent value="effectiveness" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3 mt-4">
                    Efectividad de Control por Generación
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Método de control aplicado: <span className="font-semibold text-green-700">
                      {controlMethodSelected === 'pheromone_Traps' ? 'Trampas de Feromonas' :
                       controlMethodSelected === 'mating_Disruption' ? 'Confusión Sexual' :
                       controlMethodSelected === 'insecticides' ? 'Insecticidas' :
                       'Técnica del Insecto Estéril'}
                    </span>
                  </p>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={[
                        { name: "1ª Gen", efectividad: controlEffectiveness.generation1 * 100 },
                        { name: "2ª Gen", efectividad: controlEffectiveness.generation2 * 100 },
                        { name: "3ª Gen", efectividad: controlEffectiveness.generation3 * 100 },
                        { name: "4ª Gen", efectividad: controlEffectiveness.generation4 * 100 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: "Efectividad (%)", angle: -90, position: "insideLeft" }} />
                      <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, "Efectividad"]} />
                      <Legend />
                      <Line type="monotone" dataKey="efectividad" stroke="#8884d8" name="Efectividad del Control" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Recomendaciones</h3>
            <div className="space-y-2">
              {recommendations.map((recommendation, index) => (
                <Alert key={index} variant={index === 0 ? "default" : "default"}>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{recommendation}</AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
