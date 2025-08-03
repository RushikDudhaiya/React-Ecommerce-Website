import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import axios from 'axios'
import Footer from './components/Footer'
import SingleProduct from './pages/SingleProduct'
import CategoryProduct from './pages/CategoryProduct'
import { useCart } from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  const [location, setLocation] = useState()
  const [openDropDown, setOpenDropDown] = useState(false)
  const { cartItem, setCartItem } = useCart();
  const [cartInitialized, setCartInitialized] = useState(false);

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords;

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      try {
        const location = await axios.get(url)
        const extraLocation = location.data.address;
        // console.log(location);
        // console.log(extraLocation);
        setOpenDropDown(false)
        setLocation(extraLocation)
      } catch (error) {
        console.log(error);
      }
    })
  }

  useEffect(() => {
    getLocation()
  }, [])

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItem')
    if (storedCart) {
      setCartItem(JSON.parse(storedCart))
    }
    setCartInitialized(true); // mark as loaded
  }, []);

  //save cart to local storage whenever it changes
  useEffect(() => {
    if (cartInitialized) {
      localStorage.setItem('cartItem', JSON.stringify(cartItem))
    }
  }, [cartItem, cartInitialized])

  return (
    <BrowserRouter>
      <Navbar location={location} getLocation={getLocation} openDropDown={openDropDown} setOpenDropDown={setOpenDropDown} />
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/products/:id' element={<SingleProduct />}></Route>
        <Route path='/category/:category' element={<CategoryProduct />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/cart' element={<ProtectedRoute>
          <Cart location={location}
            getLocation={getLocation} />
        </ProtectedRoute>}>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
