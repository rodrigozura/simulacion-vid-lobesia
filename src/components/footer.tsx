export default function Footer() {
  return (
    <footer className="bg-green-900 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-green-200">© {new Date().getFullYear()} Simulador de Lobesia Botrana</p>
          <p className="text-sm text-green-200 mt-2 md:mt-0">Desarrollado para la Cooperativa La Riojana</p>
        </div>
      </div>
    </footer>
  )
}
