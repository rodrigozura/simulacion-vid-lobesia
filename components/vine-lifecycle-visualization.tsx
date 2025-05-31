"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface VineLifecycleVisualizationProps {
  grapeVariety: string
}

export default function VineLifecycleVisualization({ grapeVariety }: VineLifecycleVisualizationProps) {
  const varietyName = grapeVariety === "malbec" ? "Malbec" : "Torrontés Riojano"

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-700">Ciclo de Vida de la Vid y Lobesia Botrana</h3>

      <Tabs defaultValue="phenology" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="phenology">Fenología de la Vid</TabsTrigger>
          <TabsTrigger value="lobesia">Ciclo de Lobesia</TabsTrigger>
        </TabsList>

        <TabsContent value="phenology" className="space-y-4 pt-4">
          <div className="relative">
            <div className="h-16 bg-gradient-to-r from-green-100 via-amber-100 to-amber-200 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex">
                <div className="w-1/6 border-r border-dashed border-gray-400 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-700">Brotación</span>
                </div>
                <div className="w-1/6 border-r border-dashed border-gray-400 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-700">Floración</span>
                </div>
                <div className="w-1/6 border-r border-dashed border-gray-400 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-700">Cuaje</span>
                </div>
                <div className="w-1/6 border-r border-dashed border-gray-400 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-700">Desarrollo</span>
                </div>
                <div className="w-1/6 border-r border-dashed border-gray-400 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-700">Envero</span>
                </div>
                <div className="w-1/6 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-700">Maduración</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dic</span>
              <span>Ene</span>
              <span>Feb</span>
              <span>Mar</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Floración (Oct-Nov)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-600">
                  Aparecen los racimos florales 6-8 semanas después de la brotación. Las flores se polinizan y comienza
                  el desarrollo de las bayas.
                </p>
                <div className="mt-2 text-xs text-amber-700 font-medium">
                  {varietyName === "Malbec"
                    ? "El Malbec suele tener una floración compacta y uniforme."
                    : "El Torrontés Riojano tiene una floración más extendida y sensible a condiciones climáticas."}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Cuaje y Desarrollo (Nov-Ene)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-600">
                  Las flores fecundadas se convierten en pequeñas bayas verdes que crecen en tamaño y peso durante
                  diciembre y principios de enero.
                </p>
                <div className="mt-2 text-xs text-amber-700 font-medium">
                  {varietyName === "Malbec"
                    ? "El Malbec desarrolla bayas de tamaño medio con buena concentración de compuestos fenólicos."
                    : "El Torrontés Riojano forma racimos más grandes con bayas de piel fina."}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Envero y Maduración (Ene-Mar)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-600">
                  A mediados de enero comienza el envero: las bayas cambian de color, acumulan azúcares y desarrollan
                  aromas característicos.
                </p>
                <div className="mt-2 text-xs text-amber-700 font-medium">
                  {varietyName === "Malbec"
                    ? "El Malbec madura más tarde, con cosecha típica en febrero-marzo, desarrollando intensos colores y taninos."
                    : "El Torrontés Riojano madura antes, cosechándose desde fines de enero, con desarrollo de aromas florales característicos."}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lobesia" className="space-y-4 pt-4">
          <div className="relative">
            <div className="h-16 bg-gradient-to-r from-purple-100 via-blue-100 to-purple-100 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex">
                <div className="w-1/4 border-r border-dashed border-gray-400 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-700">1ª Generación</span>
                </div>
                <div className="w-1/4 border-r border-dashed border-gray-400 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-700">2ª Generación</span>
                </div>
                <div className="w-1/4 border-r border-dashed border-gray-400 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-700">3ª Generación</span>
                </div>
                <div className="w-1/4 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-700">Diapausa</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dic</span>
              <span>Ene</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Abr</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Card>
              <CardHeader className="pb-2 bg-purple-50">
                <CardTitle className="text-sm font-medium">1ª Generación (Sep-Nov)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-600">
                  Emerge en primavera, coincidiendo con la floración. Las larvas atacan las inflorescencias y botones
                  florales.
                </p>
                <div className="mt-2 text-xs text-purple-700 font-medium">
                  Daño: Destrucción de flores, reducción del cuaje inicial.
                </div>
                <div className="mt-2 text-xs text-green-700 font-medium">
                  Control: Muy efectivo en esta etapa con monitoreo temprano y aplicaciones preventivas.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 bg-blue-50">
                <CardTitle className="text-sm font-medium">2ª Generación (Nov-Ene)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-600">
                  Coincide con el desarrollo de frutos. Las larvas perforan y se alimentan de las bayas verdes.
                </p>
                <div className="mt-2 text-xs text-purple-700 font-medium">
                  Daño: Perforación de bayas verdes, formación de "nidos" con seda, pérdida directa de frutos.
                </div>
                <div className="mt-2 text-xs text-green-700 font-medium">
                  Control: Efectivo con confusión sexual e insecticidas específicos aplicados oportunamente.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 bg-red-50">
                <CardTitle className="text-sm font-medium">3ª Generación (Ene-Mar)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-600">
                  Ataca durante el envero y maduración. Las larvas perforan bayas maduras, facilitando infecciones
                  secundarias.
                </p>
                <div className="mt-2 text-xs text-purple-700 font-medium">
                  Daño: Perforación de bayas maduras, podredumbre por Botrytis, pérdida severa de calidad.
                </div>
                <div className="mt-2 text-xs text-green-700 font-medium">
                  Control: Más difícil por proximidad a cosecha. Requiere estrategias integradas y preventivas.
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sincronización con {varietyName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-600">
                  {grapeVariety === "malbec"
                    ? "El Malbec es particularmente vulnerable a la 3ª generación de Lobesia botrana debido a que su maduración coincide con el pico de actividad de esta generación. Los racimos compactos del Malbec facilitan la propagación de podredumbres secundarias tras el daño inicial."
                    : "El Torrontés Riojano es especialmente sensible a la 2ª y 3ª generación de Lobesia botrana. Su piel fina y racimos grandes lo hacen susceptible al daño directo y a las podredumbres secundarias. Su maduración temprana puede exponerlo a mayor presión de la plaga en años cálidos."}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
