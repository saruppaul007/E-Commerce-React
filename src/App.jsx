import React, { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/collections/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/profile/Login'
import Profile from './pages/profile/MyProfile'
import PlaceOrder from './pages/PlaceOrder'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Favorite from './pages/Favorite'
import BestSellers from './pages/BestSellers'
import Preloader from './components/preloader/Preloader' // Fixed import name

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className=''>
      {isLoading ? (
        <Preloader 
          onComplete={handlePreloaderComplete}
          duration={1500}
        />
      ) : (
        <>
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path ='/' element={<Home />} />
            <Route path ='/collection' element={<Collection />} />
            <Route path ='/about' element={<About />} />
            <Route path ='/contact' element={<Contact />} />
            <Route path ='/product/:productId' element={<Product />} />
            <Route path ='/cart' element={<Cart />} />
            <Route path ='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path ='/place-order' element={<PlaceOrder />} />
            <Route path = '/favorite' element={<Favorite />} />
            <Route path='/bestsellers' element={<BestSellers />} />
          </Routes>

          <Footer />
          
          <ScrollToTop />
        </>
      )}
    </div>
  )
}

export default App