import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "../App.tsx"
import HomePage from "../pages/HomePage.tsx"
import ProductPageWrapper from "../pages/ProductPageWrapper.tsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <HomePage/> },
            { path: "/producto/:id", element: <ProductPageWrapper  /> },
            
            // puedes agregar más rutas aquí
        ],
    },
])

export function AppRouter() {
    return <RouterProvider router={router} />
}
