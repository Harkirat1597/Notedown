import React from 'react';
import { BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import {AnimatePresence} from 'framer-motion';

import Home from './Home.js';
import About from './About.js';
import User from './User.js';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Animate = (props) => { 
    const {mode, setMode} = props;

    const location = useLocation();

    return (
        <AnimatePresence>
        <Routes location={location} key={location.pathname} >
            <Route exact path="/" element={<Home mode={mode}/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/user" element={<User mode={mode} setMode={setMode} />} />
            <Route exact path="/signup" element={<SignUp mode={mode} />} />
            <Route exact path="/signin" element={<SignIn mode={mode} />} />
        </Routes>
        </AnimatePresence>
    )
}

export default Animate;