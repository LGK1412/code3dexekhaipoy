import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopPage from './pages/ShopPage';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import LoginPage from './pages/LoginPage'; // ✅
import RegisterPage from './pages/RegisterPage'; // ✅ Thêm dòng này
import CartPage from './pages/CartPage';
import OptimizedRoomViewer from './pages/_3DCoreScreen';
import ProductDetailPage from './pages/ProductDetailPage';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutUs />} />
  <Route path="/viewer" element={<OptimizedRoomViewer />} />
  
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} /> 
  <Route path="/cart" element={<CartPage />} />
  <Route path="/shop" element={<ShopPage />} />
  <Route path="/product/:id" element={<ProductDetailPage />} />
</Routes>

    </BrowserRouter>
  </React.StrictMode>
);


