import { useState } from 'react';
import axios from 'axios'
import './App.css'
import Login from './components/login';
import Register from './components/Register'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import FarmerDashboard from './components/FarmerDashboard';
import BuyerMarketplace from './components/BuyerMarketPlace';
import AdminPanel from './components/AdminPanel';
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element = {< LandingPage />} />
        <Route path='/login' element = {< Login />} />
        <Route path='/register' element = {< Register />} />
        <Route path='/farmer/dashboard' element = {<  FarmerDashboard/>} />
        <Route path='/buyer/dashboard' element = {<  BuyerMarketplace/>} />
        <Route path='/admin/dashboard' element = {<  AdminPanel/>} />
      </Routes>
    </Router>
  )
}

export default App
