import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Registation from './components/Auth/Registation';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import { AuthContext } from './context/AuthProvider';
import AdminLogin from './components/Auth/AdminLogin';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from './components/other/Profile';
import AllUsersData from './components/other/allUsersData';

const App = () => {

  const navigate = useNavigate();
  const { isLogin, setIsLogin, loggedUserId } = useContext(AuthContext);

  useEffect(() => {
    if (isLogin) {
    
      if (loggedUserId == "admin@gmail.com") {
        navigate('/admindashboard');
      }
      else {
        navigate('/employeedashboard');
      }
    } else {
      navigate('/login');
      // setIsLogin(false);
    }
  }, [isLogin]);

  return (
    <>
          <ToastContainer position="top-right" autoClose={1000} />
    <Routes>
      <Route path="/" element={isLogin ? <EmployeeDashboard /> : <Login />} />
      <Route path="/register" element={<Registation />} />
      <Route path="/login" element={<Login />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/employeedashboard" element={<EmployeeDashboard />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/allusersdata" element={<AllUsersData />} />
    </Routes>
    </>
  );
};

export default App;
