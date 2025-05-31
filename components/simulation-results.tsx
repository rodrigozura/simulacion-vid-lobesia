"use client"

import type { SimulationResult } from "@/lib/types"
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
import VineLifecycleVisualization from "./vine-lifecycle-visualization"
import CostBenefitAnalysis from "./cost-benefit-analysis"

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
    acidityQuality,
    qualityLoss,
    generationImpact,
    controlEffectiveness,
    recommendations,
    economicImpact,
  } = results

  const varietyName = grapeVariety === "malbec" ? "Malbec" : "Torrontés Riojano"
  const yieldPercentage = 100 - yieldLoss
  const qualityPercentage = 100 - qualityLoss

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

  const qualityImpactData = [
    { name: "Acidez apta comercialmente", value: acidityQuality },
    { name: "Acidez no apta", value: 100 - acidityQuality },
  ]

  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader className="bg-green-700 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Resultados de la Simulación - {varietyName}</CardTitle>
            <Badge className={severityColor()}>Impacto: {severityLevel()}</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="summary">Resumen</TabsTrigger>
              <TabsTrigger value="generations">Generaciones</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div className="h-full bg-green-600 rounded-full" style={{ width: `${yieldPercentage}%` }}></div>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <h3 className="text-lg font-semibold text-amber-800 mb-2">Calidad enológica de las uvas</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Pérdida de calidad:</span>
                    <span className="font-bold text-red-600">{qualityLoss.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-gray-600">Acidez apta comercialmente:</span>
                    <span className="font-bold text-green-600">{results.acidityQuality.toFixed(1)}%</span>
                  </div>
                  <div className="mt-4 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: `${qualityPercentage}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Impacto por Generación</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={generationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: "Impacto (%)", angle: -90, position: "insideLeft" }} />
                      <Tooltip />
                      <Bar dataKey="impacto" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Impacto en Calidad</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={qualityImpactData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {qualityImpactData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? "#4CAF50" : "#F44336"} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <Alert className="mt-4">
                <Info className="h-4 w-4" />
                <AlertTitle>Recomendación Principal</AlertTitle>
                <AlertDescription>{recommendations[0]}</AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="generations" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Impacto por Generación</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={generationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: "Impacto (%)", angle: -90, position: "insideLeft" }} />
                      <Tooltip />
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
                </div>

                <Alert className="mt-2">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Información Importante</AlertTitle>
                  <AlertDescription>
                    La 3ª generación suele causar el mayor daño cualitativo debido a la podredumbre secundaria
                    (Botrytis) que facilita en las bayas maduras.
                  </AlertDescription>
                </Alert>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3 mt-4">
                    Efectividad de Control por Generación
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={[
                        { name: "1ª Gen", trampas: 65, confusion: 75, insecticidas: 80, esteril: 60 },
                        { name: "2ª Gen", trampas: 55, confusion: 70, insecticidas: 75, esteril: 65 },
                        { name: "3ª Gen", trampas: 40, confusion: 60, insecticidas: 70, esteril: 70 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: "Efectividad (%)", angle: -90, position: "insideLeft" }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="trampas" stroke="#8884d8" name="Trampas de Feromonas" />
                      <Line type="monotone" dataKey="confusion" stroke="#82ca9d" name="Confusión Sexual" />
                      <Line type="monotone" dataKey="insecticidas" stroke="#ff7300" name="Insecticidas" />
                      <Line type="monotone" dataKey="esteril" stroke="#0088fe" name="Técnica Insecto Estéril" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="lifecycle" className="pt-4">
              <VineLifecycleVisualization grapeVariety={grapeVariety} />
            </TabsContent>

            <TabsContent value="economics" className="pt-4">
              <CostBenefitAnalysis economicImpact={economicImpact} />
            </TabsContent>
          </Tabs>

          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Recomendaciones</h3>
            <div className="space-y-2">
              {recommendations.map((recommendation, index) => (
                <Alert key={index} variant={index === 0 ? "default" : "outline"}>
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
