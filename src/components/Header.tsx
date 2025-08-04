// src/components/Header.tsx
import { ShoppingCart, Search } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { useCarrito } from "../context/CarritoContext"

interface HeaderProps {
  onAbrirCarrito: () => void
  onVolverHome?: () => void 
}

export default function Header({ onAbrirCarrito, onVolverHome }: HeaderProps) {
  const { cantidadTotal } = useCarrito()

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm px-4 py-2 flex justify-between items-center">
      <h1
        className="text-lg font-bold cursor-pointer"
        onClick={onVolverHome}
      >
        🛍️ Store
      </h1>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={onAbrirCarrito}
        >
          <ShoppingCart className="h-5 w-5" />
          {cantidadTotal > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {cantidadTotal}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  )
}
