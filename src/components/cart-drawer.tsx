import { useCarrito } from "../context/CarritoContext"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import { ShoppingBag, X, Trash2, Minus, Plus } from "lucide-react"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, actualizarCantidad, eliminar, vaciar } = useCarrito()

  const subtotal = items.reduce((total, item) => total + item.precio * item.cantidad, 0)
  const envio = subtotal >= 50 ? 0 : 4.99
  const total = subtotal + envio

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Carrito de Compras</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tu carrito está vacío</h3>
              <p className="text-gray-500 mb-6">Agrega algunos productos para comenzar a comprar</p>
              <Button onClick={onClose} className="bg-gray-900 hover:bg-gray-800">
                Continuar Comprando
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.carritoId} className="flex gap-3 p-3 border rounded-lg">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.imagen || "/placeholder.svg"}
                          alt={item.nombre}
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{item.nombre}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.color} • Talla {item.talla}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-semibold text-gray-900">€{item.precio}</span>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 bg-transparent"
                              onClick={() => actualizarCantidad(item.carritoId, item.cantidad - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-6 text-center">{item.cantidad}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 bg-transparent"
                              onClick={() => actualizarCantidad(item.carritoId, item.cantidad + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-red-500 flex-shrink-0"
                        onClick={() => eliminar(item.carritoId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {items.length > 1 && (
                  <div className="mt-4 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={vaciar}
                      className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Vaciar Carrito
                    </Button>
                  </div>
                )}
              </div>

              <div className="border-t p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Envío</span>
                    <span className={envio === 0 ? "text-green-600" : ""}>
                      {envio === 0 ? "¡Gratis!" : `€${envio.toFixed(2)}`}
                    </span>
                  </div>
                  {subtotal < 50 && subtotal > 0 && (
                    <p className="text-xs text-gray-500">
                      Agrega €{(50 - subtotal).toFixed(2)} más para envío gratis
                    </p>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full bg-gray-900 hover:bg-gray-800" size="lg">
                    Proceder al Pago
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" onClick={onClose}>
                    Continuar Comprando
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
