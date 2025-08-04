"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Star, Minus, Plus, Truck, Shield, RotateCcw, ArrowLeft } from "lucide-react"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Card } from "../components/ui/card"
import { Separator } from "../components/ui/separator"
import type { Producto } from "../types/producto"
import { useCarrito } from "../context/CarritoContext"
import Header from "../components/Header"
import Swal from "sweetalert2"




interface ProductPageProps {
  producto: Producto
  onVolverHome: () => void
  onAbrirCarrito: () => void
}

export default function ProductPage({
  producto,
  onVolverHome,
  onAbrirCarrito,
}: ProductPageProps) {
  const { cantidadTotal, agregar } = useCarrito()
  const [imagenSeleccionada, setImagenSeleccionada] = useState(0)
  const [colorSeleccionado, setColorSeleccionado] = useState(0)
  const [tallaSeleccionada, setTallaSeleccionada] = useState("")
  const [cantidad, setCantidad] = useState(1)
  const [enFavoritos, setEnFavoritos] = useState(false)

 const agregarAlCarrito = () => {
  if (!tallaSeleccionada) {
    Swal.fire({
      icon: "warning",
      title: "Talla no seleccionada",
      text: "Por favor selecciona una talla antes de agregar al carrito.",
    })
    return
  }

  const item = {
    productoId: producto.id,
    nombre: producto.nombre,
    precio: producto.precio,
    color: producto.colores[colorSeleccionado].nombre,
    talla: tallaSeleccionada,
    cantidad: cantidad,
    imagen: producto.imagenes[0],
  }

  agregar({ ...item, carritoId: Date.now() })

  Swal.fire({
    icon: "success",
    title: "Producto agregado",
    text: `¡${producto.nombre} ha sido agregado al carrito!`,
    timer: 2000,
    showConfirmButton: false,
  })
}

  const toggleFavoritos = () => {
    setEnFavoritos(!enFavoritos)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
    <Header onVolverHome={onVolverHome} onAbrirCarrito={onAbrirCarrito} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <button onClick={onVolverHome} className="hover:text-gray-700">
            Inicio
          </button>
          <span>/</span>
          <span className="text-gray-900">{producto.nombre}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galería de Imágenes */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src={producto.imagenes[imagenSeleccionada] || "/placeholder.svg"}
                alt={producto.nombre}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {producto.imagenes.map((imagen, index) => (
                <button
                  key={index}
                  onClick={() => setImagenSeleccionada(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 ${imagenSeleccionada === index ? "border-gray-900" : "border-gray-200"
                    }`}
                >
                  <img
                    src={imagen || "/placeholder.svg"}
                    alt={`Vista ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Información del Producto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{producto.nombre}</h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(producto.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {producto.rating} ({producto.reviews} reseñas)
                </span>
              </div>

              {/* Precio */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">€{producto.precio}</span>
                {producto.precioOriginal && (
                  <>
                    <span className="text-xl text-gray-500 line-through">€{producto.precioOriginal}</span>
                    <Badge variant="destructive">-{producto.descuento}%</Badge>
                  </>
                )}
              </div>
            </div>

            {/* Colores */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Color: {producto.colores[colorSeleccionado].nombre}
              </h3>
              <div className="flex space-x-2">
                {producto.colores.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setColorSeleccionado(index)}
                    className={`w-8 h-8 rounded-full border-2 ${colorSeleccionado === index ? "border-gray-900 ring-2 ring-gray-300" : "border-gray-300"
                      }`}
                    style={{ backgroundColor: color.codigo }}
                    title={color.nombre}
                  />
                ))}
              </div>
            </div>

            {/* Tallas */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Talla</h3>
              <div className="grid grid-cols-6 gap-2">
                {producto.tallas.map((talla) => (
                  <button
                    key={talla}
                    onClick={() => setTallaSeleccionada(talla)}
                    className={`py-2 px-3 text-sm font-medium border rounded-md ${tallaSeleccionada === talla
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
                      }`}
                  >
                    {talla}
                  </button>
                ))}
              </div>
            </div>

            {/* Cantidad */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Cantidad</h3>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="icon" onClick={() => setCantidad(Math.max(1, cantidad - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium w-8 text-center">{cantidad}</span>
                <Button variant="outline" size="icon" onClick={() => setCantidad(cantidad + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="space-y-3">
              <Button
                onClick={agregarAlCarrito}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Agregar al Carrito
              </Button>

              <Button onClick={toggleFavoritos} variant="outline" className="w-full py-3 bg-transparent" size="lg">
                <Heart className={`h-5 w-5 mr-2 ${enFavoritos ? "fill-current text-red-500" : ""}`} />
                {enFavoritos ? "Quitar de Favoritos" : "Agregar a Favoritos"}
              </Button>
            </div>

            {/* Información de Envío */}
            <Card className="p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Envío gratis en pedidos superiores a €50</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">Devoluciones gratuitas hasta 30 días</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <span className="text-sm">Garantía de calidad</span>
                </div>
              </div>
            </Card>

            <Separator />

            {/* Descripción */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Descripción</h3>
              <p className="text-gray-600 mb-4">{producto.descripcion}</p>

              <h4 className="text-md font-medium text-gray-900 mb-2">Características:</h4>
              {producto.caracteristicas?.map((caracteristica, index) => (
                <p key={index}>
                  <strong>{caracteristica.nombre}:</strong> {caracteristica.valor}
                </p>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
