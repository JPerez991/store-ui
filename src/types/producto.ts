// Interfaces principales
export interface Producto {
  id: string;
  nombre: string;
  imagenes: string[];
  precio: number;
  precioOriginal?: number | null;
  descuento?: number;
  rating: number;
  reviews: number;
  colores: { nombre: string; codigo: string }[];
  categoria: string;
  descripcion?: string;
  caracteristicas?: { nombre: string; valor: string }[];
  tallas: string[];
}


export interface ItemCarrito {
    carritoId: string;
    productoId: string;  // Cambiado a string para coincidir con el formato del JSON
    nombre: string;
    precio: number;
    color: string;
    talla: string;
    cantidad: number;
    imagen: string;
    variaciones: {
        color: string;
        talla: string;
    };
}

// Interfaces auxiliares
export interface ImagenProducto {
    imageId: string;
    imageUrl: string;
    imageText: string;
}

export interface ColorProducto {
    nombre: string;
    codigo: string;
}

export interface ProductoVariacion {
    itemId: string;
    nombre: string;
    color: string;
    talla: string;
    precio: number;
    disponible: boolean;
    imagenes: ImagenProducto[];
}