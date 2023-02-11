import React, {useState, useEffect, useRef, useContext} from 'react';
import { Link, useNavigate } from "react-router-dom";
import {motion} from 'framer-motion';

import AlertContext from '../Context/alert/AlertContext';
import NoteContext from '../Context/notes/NoteContext.js';
import ChangePassword from './ChangePassword';

const User = ({ mode, setMode }) => {
    const navigate = useNavigate();

    const toggleRef = useRef();
    
    const { setAlert } = useContext(AlertContext);
    const { signOut, user } = useContext(NoteContext);

    const [click, setClick] = useState(true);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        modeSettings();
    }, []);

    const modeSettings = () => {
        // Setting up basic settings if Mode is dark...
        if (mode.current === "dark") {
            toggleRef.current.checked = true;
            setClick(false);
        }
    }

    const handleClickChangePass = (e) => {
        e.preventDefault();
        if (flag) setFlag(false)
        else setFlag(true);
    }

    // false = "light" | true = "dark"
    const handleModeChange = (e) => {
        if (click === true) {
            setClick(false);
            setMode({current: "dark"});
            localStorage.removeItem('appmode');
            localStorage.setItem('appmode', "dark");
        }
        else {
            setMode({current: "light"});
            setClick(true);
            localStorage.removeItem('appmode');
            localStorage.setItem('appmode', "light");
        }
        console.log(localStorage.getItem('appmode'));
    }

    const handleSignOut = () => {
        const res = signOut();
        setAlert({message: res.message, type: "success"});
        navigate("/");
    }

    return (
        <motion.div 
            className='container-my'
            initial={{opacity: 0 }}
            animate={{opacity: 1, transition: {duration: 0.5} }}
            exit={{opacity: 0,  transition: {duration: 0} }}
        >

            <div className='short-container border-bottom-light'>
                <p>General details</p>
                <p>User Name : <span className='text-small'> { user.username } </span></p>
                <p>Email : <span className='text-small'> {user.email} </span></p>
                <p>Toggle mode</p>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={handleModeChange} ref={toggleRef}/>
                </div>
                <Link className="nav-btn my-2 mx-2" to="/signin" type="submit" onClick={handleSignOut}>Sign out</Link>
            </div>
            <div className='short-container border-bottom-light'>
                <p>Password &amp; security</p>
                {flag? <ChangePassword setFlag={setFlag} mode={mode} /> : ""}
                {!flag? <button type="submit" className='btn-form' style={{width: "150px"}} onClick={handleClickChangePass} >Change Password</button> : ""}
            </div>
            <div className='short-container'>
                <p>Any issues? connect us</p>
                <p>Call us at toll free 91 XXX XXX XXXX OR Email us at XXXYYY@notedown.com</p>
            </div>

        </motion.div>
    );
}

export default User;