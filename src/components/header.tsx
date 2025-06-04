import { GrapeIcon as Vine } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-green-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Vine size={28} />
            <div>
              <h1 className="text-xl font-bold">Simulador de Lobesia Botrana</h1>
              <p className="text-sm text-green-200">Impacto en viñedos de La Rioja, Argentina</p>
            </div>
          </div>
          <div className="hidden md:block">
            <p className="text-sm text-green-200 italic">Herramienta de Gestión Vitícola</p>
          </div>
        </div>
      </div>
    </header>
  )
}
