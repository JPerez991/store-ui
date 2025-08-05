import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import ProductPage from "./ProductPage"
import CartDrawer from "../components/cart-drawer"
import type { ItemCarrito } from "../types/item-carrito"
import type { Producto } from "../types/producto"

export default function ProductPageWrapper() {
  const location = useLocation()
  const navigate = useNavigate()
  const [ setCarrito] = useState<ItemCarrito[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const producto: Producto | undefined = location.state?.producto

  if (!producto) {
    navigate("/")
    return null
  }

  const handleAgregarAlCarrito = (item: Omit<ItemCarrito, "carritoId">) => {
    setCarrito((prev) => [...prev, { ...item, carritoId: crypto.randomUUID() }])
  }

  return (
    <>
      <ProductPage
        producto={producto}
        onVolverHome={() => navigate("/")}
        onAbrirCarrito={() => setIsCartOpen(true)}
      />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
