import React, { createContext, useContext, useState, useMemo } from "react"
import type { ItemCarrito } from "../types/item-carrito" // ajusta la ruta

type CarritoContextType = {
  items: ItemCarrito[]
  agregar: (item: ItemCarrito) => void
  eliminar: (carritoId: string) => void
  actualizarCantidad: (carritoId: string, cantidad: number) => void
  vaciar: () => void
  cantidadTotal: number
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined)

export const CarritoProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<ItemCarrito[]>([])

  const agregar = (item: ItemCarrito) => {
    setItems(prev => {
      const existente = prev.find(p => p.carritoId === item.carritoId)
      if (existente) {
        return prev.map(p =>
          p.carritoId === item.carritoId
            ? { ...p, cantidad: p.cantidad + item.cantidad }
            : p
        )
      }
      return [...prev, item]
    })
  }

  const eliminar = (carritoId: string) => {
    setItems(prev => prev.filter(p => p.carritoId !== carritoId))
  }

  const actualizarCantidad = (carritoId: string, cantidad: number) => {
    setItems(prev =>
      prev.map(p =>
        p.carritoId === carritoId ? { ...p, cantidad } : p
      )
    )
  }

  const vaciar = () => setItems([])

  const cantidadTotal = useMemo(() => {
    return items.reduce((total, item) => total + item.cantidad, 0)
  }, [items])

  return (
    <CarritoContext.Provider value={{ items, agregar, eliminar, actualizarCantidad, vaciar, cantidadTotal }}>
      {children}
    </CarritoContext.Provider>
  )
}

export const useCarrito = () => {
  const context = useContext(CarritoContext)
  if (!context) throw new Error("useCarrito debe usarse dentro de CarritoProvider")
  return context
}
