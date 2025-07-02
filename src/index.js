import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import OptimizedRoomViewer from './pages/_3DCoreScreen';

import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
// ... import thêm các trang khác nếu có

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/viewer" element={<OptimizedRoomViewer />} />
        {/* Thêm các route khác ở đây */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
