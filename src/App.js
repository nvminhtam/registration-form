import './App.css';
import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Home />} />
        </Routes>
    </div>
  );
}

export default App;
