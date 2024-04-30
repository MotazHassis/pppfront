import logo from './logo.svg';
import React, { useState,useEffect } from 'react'
import { useParams } from "react-router";
import './App.css';
import {
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Wing from './components/Wing';
function App() {
  return (
    <div style={{maxWidth:'35rem'}} className="App container modal-content border-0 shadow">
      <div className="text-center bg-secondary border border-5 border-dark mt-2">
        <h1>بسم الله</h1>
      </div>
      <Routes>
        <Route path="/" element={<Wing/>}/>
      </Routes>
    </div>
  );
}

export default App;
