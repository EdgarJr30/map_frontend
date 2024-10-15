import { Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth/pages/LoginPage"
import { ToastContainer } from "react-toastify"

import "react-toastify/ReactToastify.css"
import Navbar from "../ui/components/Navbar"
import Home from "../library/pages/Home"
import ProtectedRoute from "@/auth/components/ProtectedRoute"
import CrearEditarLibroForm from "@/auth/pages/libros/CrearEditarLibroForm"
import Libros from "@/auth/pages/libros/Libros"
import Autores from "@/auth/pages/autores/Autores"
import CrearEditarAutorForm from "@/auth/pages/autores/CrearEditarAutorForm"
import Categorias from "@/auth/pages/categorias/Categorias"
import CrearEditarCategoriaForm from "@/auth/pages/categorias/CrearEditarCategoriaForm"

const AppRouter = () => {

    return (
        <>
            <Navbar />
            <ToastContainer />
            <Routes>
                <Route path="/*" element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="login" element={<LoginPage />} />

                <Route path="/libros" element={<ProtectedRoute allowedRoleId={2}><Libros /></ProtectedRoute>} />
                <Route path="/libros/crear" element={<ProtectedRoute allowedRoleId={2}><CrearEditarLibroForm /></ProtectedRoute>} />
                <Route path="/libros/:libroId?" element={<ProtectedRoute allowedRoleId={2}><CrearEditarLibroForm /></ProtectedRoute>} />

                <Route path="/autores" element={<ProtectedRoute allowedRoleId={2}><Autores /></ProtectedRoute>} />
                <Route path="/autores/crear" element={<ProtectedRoute allowedRoleId={2}><CrearEditarAutorForm /></ProtectedRoute>} />
                <Route path="/autores/:autorId?" element={<ProtectedRoute allowedRoleId={2}><CrearEditarAutorForm /></ProtectedRoute>} />  

                <Route path="/categorias" element={<ProtectedRoute><Categorias /></ProtectedRoute>} />
                <Route path="/categorias/crear" element={<ProtectedRoute><CrearEditarCategoriaForm /></ProtectedRoute>} />
                <Route path="/categorias/:categoriaId?" element={<ProtectedRoute><CrearEditarCategoriaForm /></ProtectedRoute>} />              
            </Routes>
        </>
    )
}

export default AppRouter