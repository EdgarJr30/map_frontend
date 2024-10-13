import { Navigate, Route, Routes } from "react-router-dom"

const LibraryRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
        </>
    )
}

export default LibraryRoutes