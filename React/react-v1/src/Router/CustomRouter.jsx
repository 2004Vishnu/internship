import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '../Pages/Home'
import Product from '../Pages/Product'
import About from '../Pages/About'
import Contact from '../Pages/Contact'
import Service from '../Pages/Service'

function CustomRouter() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/product' element={<Product/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/service' element={<Service/>}></Route>
    </Routes>
  )
}

export default CustomRouter
