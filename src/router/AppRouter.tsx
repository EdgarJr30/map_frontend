import { Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth/pages/LoginPage"
import { ToastContainer } from "react-toastify"

import "react-toastify/ReactToastify.css"
import Navbar from "../ui/components/Navbar"
import Home from "../library/pages/Home"
import ProtectedRoute from "@/auth/components/ProtectedRoute"
import CrearEditarLibroForm from "@/auth/pages/libros/CrearEditarLibroForm"
import Libros from "@/auth/pages/libros/Libros"

const AppRouter = () => {

    return (
        <>
            <Navbar />
            <ToastContainer />
            <Routes>
                <Route path="home" element={<Home />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="/libros" element={<ProtectedRoute><Libros /></ProtectedRoute>} />
                <Route path="/libros/crear" element={<ProtectedRoute><CrearEditarLibroForm /></ProtectedRoute>} />
                <Route path="/libros/:libroId?" element={<ProtectedRoute><CrearEditarLibroForm /></ProtectedRoute>} />
                <Route path="/*" element={<Home />} />
            </Routes>
        </>
    )
}

export default AppRouter