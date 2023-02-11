import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";

import Animate from './Components/Animate.js';
import Navbar from './Components/Navbar.js';
import Alert from './Components/Alert.js';

import NoteState from  './Context/notes/NoteState.js';
import AlertState from './Context/alert/AlertState.js';
import ModeState from './Context/mode/ModeState.js'

function App() {
  const appMode = localStorage.getItem('appmode');

  const [mode, setMode] = useState({current: appMode ? appMode : "light"});

  useEffect(() => {
    if (mode.current === "light") {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.remove("light");
    }
    document.body.classList.add(mode.current);
  }, [mode])

  return (
    <>
      <NoteState>
      <AlertState>
      <ModeState>

      <BrowserRouter>
        <Navbar mode={mode} />
        <Alert />
        <Animate mode={mode} setMode={setMode} />
      </BrowserRouter>
      
      </ModeState>
      </AlertState>
      </NoteState>
    </>
  );
}

export default App;
