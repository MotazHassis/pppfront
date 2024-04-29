import logo from './logo.svg';
import React, { useState,useEffect } from 'react'
import { useParams } from "react-router";
import './App.css';
import {
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Registration from './components/Registration';
import ChatPage from './components/ChatPage'
import Login from './components/Login';
import Wing from './components/Wing';
function App() {
  return (
    <div style={{maxWidth:'35rem'}} className="App container modal-content border-0 shadow">
      <div className="text-center bg-secondary border border-5 border-dark mt-2">
        <h1>Mern Chat</h1>
      </div>
      <Routes>
        <Route path="/wing" element={<Wing/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/Registration" element={<Registration/>}/>
        <Route path="/chat/:id"  element={<ChatPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
