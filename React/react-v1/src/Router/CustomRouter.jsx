
import { Route, Routes } from 'react-router'
import Home from '../Pages/Home'
import Product from '../Pages/Product'
import About from '../Pages/About'
import Contact from '../Pages/Contact'
import Service from '../Pages/Service'
import Whether from '../Pages/Whether'
import Students from '../Pages/Students'

function CustomRouter() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/product' element={<Product/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/service' element={<Service/>}></Route>
        <Route path='/weather' element={<Whether/>}></Route>
        <Route path='/students' element={<Students/>}></Route>
    </Routes>
  )
}

export default CustomRouter
