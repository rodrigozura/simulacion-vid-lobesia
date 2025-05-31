"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"
import type { EconomicImpact } from "@/lib/types"

interface CostBenefitAnalysisProps {
  economicImpact: EconomicImpact
}

export default function CostBenefitAnalysis({ economicImpact }: CostBenefitAnalysisProps) {
  const {
    lossWithoutControl,
    lossWithControl,
    controlCosts,
    netBenefit,
    returnOnInvestment,
    costPerHectare,
    methodCosts,
  } = economicImpact

  const costBenefitData = [
    { name: "Sin Control", valor: lossWithoutControl, fill: "#F44336" },
    { name: "Con Control", valor: lossWithControl, fill: "#FFC107" },
    { name: "Costo Control", valor: controlCosts, fill: "#2196F3" },
    { name: "Beneficio Neto", valor: netBenefit, fill: "#4CAF50" },
  ]

  const methodCostsData = Object.entries(methodCosts).map(([key, value]) => {
    const methodNames: Record<string, string> = {
      pheromoneTraps: "Trampas de Feromonas",
      matingDisruption: "Confusión Sexual",
      insecticides: "Insecticidas",
      sterileInsectTechnique: "Técnica Insecto Estéril",
    }

    return {
      name: methodNames[key],
      costo: value,
    }
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Análisis Costo-Beneficio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pérdida sin control:</span>
                <span className="font-bold text-red-600">${lossWithoutControl.toLocaleString()} / ha</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pérdida con control:</span>
                <span className="font-bold text-amber-600">${lossWithControl.toLocaleString()} / ha</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Costo de control:</span>
                <span className="font-bold text-blue-600">${controlCosts.toLocaleString()} / ha</span>
              </div>
              <div className="h-px bg-gray-200 my-2"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Beneficio neto:</span>
                <span className="font-bold text-green-600">${netBenefit.toLocaleString()} / ha</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Retorno de inversión:</span>
                <span className="font-bold text-green-600">{returnOnInvestment.toFixed(1)}x</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Costos por Método de Control</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={methodCostsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Costo por hectárea"]} />
                <Bar dataKey="costo" fill="#8884d8" name="Costo por hectárea ($)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Comparativa Económica</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costBenefitData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: "Valor ($/ha)", angle: -90, position: "insideLeft" }} />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Valor por hectárea"]} />
              <Legend />
              <Bar dataKey="valor" name="Valor por hectárea ($)">
                {costBenefitData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 text-sm text-gray-600">
            <p>
              <strong>Interpretación:</strong> El análisis muestra que la implementación de medidas de control tiene un
              costo de ${controlCosts.toLocaleString()} por hectárea, pero reduce las pérdidas potenciales de $
              {lossWithoutControl.toLocaleString()} a ${lossWithControl.toLocaleString()} por hectárea. Esto resulta en
              un beneficio neto de ${netBenefit.toLocaleString()} por hectárea y un retorno de inversión de{" "}
              {returnOnInvestment.toFixed(1)}x.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
