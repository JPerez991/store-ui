"use client"

import { useEffect, useState } from "react"
import { Heart,  Star, Search } from "lucide-react"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import type { Producto } from "../types/producto"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useCarrito } from "../context/CarritoContext"
import CartDrawer from "../components/cart-drawer"
import Header from "../components/Header"



export default function HomePage() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [busqueda, setBusqueda] = useState("")
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todos")
  const [error, setError] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()
  const [isCartOpen, setIsCartOpen] = useState(false)

 

  useEffect(() => {
    const obtenerProductos = async () => {
      setCargando(true);
      setError(null);

      try {
        const res = await axios.get('https://api-frontend-production.up.railway.app/api/products/125829257');
        const data = res.data;

        if (!Array.isArray(data)) {
          setError('Respuesta inesperada del servidor');
          return;
        }

        const productosTransformados: Producto[] = data.flatMap((producto: any) => {
          const items = producto.items ?? [];

          return items.map((item: any) => ({
            id: item.itemId,
            nombre: producto.productName,
            imagenes: item.images?.map((img: any) => img.imageUrl) ?? [],
            precio: item?.sellers?.[0]?.commertialOffer?.Price ?? 0,
            precioOriginal: item?.sellers?.[0]?.commertialOffer?.ListPrice ?? null,
            descuento: null,
            rating: 4,
            reviews: 0,
            colores: item.Color?.map((color: string) => ({
              nombre: color,
              codigo: "",
            })) ?? [],
            categoria: producto.categories?.[0] ?? "Sin categoría",
            tallas: ["XS", "S", "M", "L", "XL"],
            descripcion: "Este es un producto de alta calidad con diseño moderno y materiales duraderos. Ideal para el uso diario o para ocasiones especiales.",

            caracteristicas: [
              { nombre: "Material", valor: "Algodón 100%" },
              { nombre: "Cuidados", valor: "Lavar a máquina a 30°C" },
              { nombre: "Hecho en", valor: "Colombia" },
            ],
          }));
        });

        setProductos(productosTransformados);
      } catch (error: any) {
        setError(error.message ?? "Error al obtener productos");
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);



  const categorias = ["Todos", ...Array.from(new Set(productos.map((p) => p.categoria)))]

  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = (producto.nombre || "").toLowerCase().includes((busqueda || "").toLowerCase())
    const coincideCategoria = categoriaFiltro === "Todos" || producto.categoria === categoriaFiltro
    return coincideBusqueda && coincideCategoria
  })

  console.log("products: ", productos);
  const handleVerProducto = (producto: Producto) => {
    navigate(`/producto/${producto.id}`, { state: { producto } })
  }


  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-2xl font-bold">Cargando...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    )
  }



  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAbrirCarrito={() => setIsCartOpen(true)} />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Nueva Colección</h2>
          <p className="text-xl md:text-2xl mb-8">Descubre las últimas tendencias en moda</p>
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
            Explorar Ahora
          </Button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros y Búsqueda */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categorias.map((categoria) => (
              <Button
                key={categoria}
                variant={categoriaFiltro === categoria ? "default" : "outline"}
                onClick={() => setCategoriaFiltro(categoria)}
                className="whitespace-nowrap"
              >
                {categoria}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productosFiltrados.map((producto) => (
            <Card key={producto.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative aspect-square bg-gray-100 overflow-hidden rounded-t-lg">
                  <img
                    src={(producto.imagenes && producto.imagenes.length > 0) ? producto.imagenes[0] : "/placeholder.svg"}
                    alt={producto.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />


                  {producto.descuento && (
                    <Badge className="absolute top-2 left-2 bg-red-500">-{producto.descuento}%</Badge>
                  )}
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <div className="p-4">
                  <h3
                    className="font-medium text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-gray-700"
                    onClick={() => () => handleVerProducto(producto)}
                  >
                    {producto.nombre}
                  </h3>

                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < Math.floor(producto.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({producto.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">€{producto.precio}</span>
                      {producto.precioOriginal && (
                        <span className="text-sm text-gray-500 line-through">€{producto.precioOriginal}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 mt-2">
                    {producto.colores.slice(0, 4).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.codigo }}
                        title={color.nombre}
                      />
                    ))}
                    {producto.colores.length > 4 && (
                      <span className="text-xs text-gray-500">+{producto.colores.length - 4}</span>
                    )}
                  </div>

                  <Button className="w-full mt-3 bg-gray-900 hover:bg-gray-800" onClick={() => handleVerProducto(producto)}>
                    Ver Detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {productosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">STRADIVARIUS</h3>
              <p className="text-gray-400">Tu destino para la moda más actual y tendencias exclusivas.</p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Ayuda</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Envíos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Devoluciones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Guía de tallas
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Sobre nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Carreras
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Sostenibilidad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Prensa
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Síguenos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    TikTok
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 STRADIVARIUS. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
