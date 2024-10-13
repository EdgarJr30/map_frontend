import { Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth/pages/LoginPage"
import { ToastContainer } from "react-toastify"

import "react-toastify/ReactToastify.css"
import Navbar from "../ui/components/Navbar"
import Home from "../library/pages/Home"

const AppRouter = () => {

    return (
        <>
            <Navbar />
            <ToastContainer />
            <Routes>
                <Route path="home" element={<Home />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="/*" element={<Home />} />
            </Routes>
        </>
    )
}

export default AppRouter