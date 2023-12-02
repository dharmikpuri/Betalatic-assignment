import React from 'react'
import Home from '../Pages/HomePage/Home'
import Fav from '../Pages/Fav Page/Fav'
import { Route, Routes } from "react-router-dom"
const AllRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/fav"} element={<Fav />} />
            </Routes>
        </div>
    )
}

export default AllRoutes