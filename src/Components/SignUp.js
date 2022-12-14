import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';

import AlertContext from '../Context/alert/AlertContext.js';
import NoteContext from '../Context/notes/NoteContext.js';

const SignUp = (props) => {
    const {mode} = props;

    const alertContext = useContext(AlertContext);
    const{setAlert} = alertContext;

    const context = useContext(NoteContext);
    const {createAccount } = context;

    const navigate = useNavigate();

    const [input, setInput] = useState({username: "", email: "", password: "", confirmPassword: ""});

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (input.password !== input.confirmPassword) {
            const errMsg = "Password and confirm password do not match.";
            setAlert({message: errMsg, type:"danger"});
            return;
        }

        const create = await createAccount(input);

        if (!create) return setAlert({message: `Please try again`, type:"danger"});

        const res = await fetch(`https://jupyter-poydg.run-ap-south1.goorm.io/api/auth/sign-in`, {
        method: "POST",        
        // Adding body or contents to send
        body: JSON.stringify({
            email: `${input.email}`,
            password: `${input.password}`
        }),
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        });

        const response = await res.json();
        
        if (response.success) {
            // redirect to the user's notes
            
            localStorage.setItem('auth', response.jsontoken);
            localStorage.setItem('userdetails', JSON.stringify({username: response.userDetails.username, email: response.userDetails.email}));

            setAlert({message: `Hi ${response.userDetails.username.split(" ")[0]}`, type:"success"});

            navigate('/');
        } else {
            // display error message
            setAlert({message:response.error, type:"danger"});
        }
    }

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    }

    return (
        <>
            <motion.div 
                className="container-form  mt-3" 

                initial={{opacity: 0 }}
                animate={{opacity: 1, transition: {duration: 0.5} }}
                exit={{opacity: 0,  transition: {duration: 0} }}
            >
                <h2>NoteDown</h2>
                <p>Create your account here...</p>
                <form onSubmit={handleSubmit}
                className="form-users-cre " style={{display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", width: "100%", height: "300px"}} >
                    
                    <div className="mb-3">
                        <input onChange={handleChange} type="text" className={`form-control ${ mode.current === "dark"? "textBoxDark" : "" } `} name="username" id="username" aria-describedby="emailHelp" minLength={3} required placeholder='Enter Username'/>
                    </div>

                    <div className="mb-3">
                        <input onChange={handleChange} type="email" className={`form-control ${ mode.current === "dark"? "textBoxDark" : "" } `} name="email" id="email" aria-describedby="emailHelp" required placeholder='Enter Email'/>
                    </div>
                    
                    <div className="mb-3">
                        <input onChange={handleChange} type="password" className={`form-control ${ mode.current === "dark"? "textBoxDark" : "" } `} name="password" id="password" minLength={7} required placeholder='Enter password'/>
                    </div>
                    
                    <div className="mb-3">
                        <input onChange={handleChange} type="password" className={`form-control ${ mode.current === "dark"? "textBoxDark" : "" } `} name="confirmPassword" id="confirmPassword" minLength={7} required placeholder='Confirm password'/>
                    </div>

                    <button type="submit" className="btn-form" >Register</button>
                </form >
            </motion.div>
        </>
    )
}

export default SignUp;