import React from "react"
import ReactDOM from "react-dom/client"
import "./styles/globals.css"
import { AppRouter } from "./router/index"
import { CarritoProvider } from "./context/CarritoContext"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <CarritoProvider>
            <AppRouter />
        </CarritoProvider>
    </React.StrictMode>
)

