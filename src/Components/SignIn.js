import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion';

import AlertContext from '../Context/alert/AlertContext.js';
import noteContext from '../Context/notes/NoteContext.js';

const SignIn = ({ mode }) => {
    const navigate = useNavigate();

    const { setAlert } = useContext(AlertContext);
    const { signIn } = useContext(noteContext);

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res_signIn = await signIn({email: emailRef.current.value, password: passwordRef.current.value});

        if (!res_signIn.success) return setAlert({message:res_signIn.error, type:"danger"});

        setAlert({message: `Welcome back ${res_signIn.userDetails.username.split(" ")[0]}`, type:"success"});
        navigate("/");
        return;
    }

    return (
        <motion.div 
            className="container-form mt-3" 

            initial={{opacity: 0 }}
            animate={{opacity: 1, transition: {duration: 0.5} }}
            exit={{opacity: 0,  transition: {duration: 0} }}
        >

            <h2>NoteDown</h2>
            <p>Welcome sign in here...</p>

            <form onSubmit={handleSubmit}
             className="form-users-cre " 
             style={{display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", width: "100%", height: "250px"}} >
                
                <div className="mb-3">
                    <input type="email" className={`form-control ${ mode.current === "dark"? "textBoxDark" : "" } `} name="email" id="email" placeholder='Enter Email' ref={emailRef} required 
                   />
                </div>
                
                <div className="mb-3">
                    <input type="password" className={`form-control ${ mode.current === "dark"? "textBoxDark" : "" } `} name="password" id="password" placeholder='Enter Password' ref={passwordRef} required 
                    />
                </div>
                
                <button type="submit " className=" btn-form" >Sign in</button>
            </form >
        </motion.div>
    )
}

export default SignIn;
