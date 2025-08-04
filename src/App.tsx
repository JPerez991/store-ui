import { Outlet } from "react-router-dom"

export default function App() {
    return (
        <div className="font-sans bg-gray-100 min-h-screen">
            <Outlet />
        </div>
    )
}
