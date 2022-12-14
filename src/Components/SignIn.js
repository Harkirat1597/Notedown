import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom'; 
import {motion} from 'framer-motion';

import AlertContext from '../Context/alert/AlertContext.js';

const SignIn = (props) => {
    const {mode} = props;

    const navigate = useNavigate();

    const alertContext = useContext(AlertContext);
    const {setAlert} = alertContext;

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`https://jupyter-poydg.run-ap-south1.goorm.io/api/auth/sign-in`, {
            method: "POST",
            
            // Adding body or contents to send
            body: JSON.stringify({
                email: `${email}`,
                password: `${password}`
            }),
            
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const response = await res.json();
        // console.log(response);
        
        if (response.success) {
            // redirect to the user's notes

            // let dt = new Date();
            // dt.setMinutes(dt.getMinutes() + 30);
            
            localStorage.setItem('auth', response.jsontoken);
            // localStorage.setItem('expiry', dt);
            localStorage.setItem('userdetails', JSON.stringify({username: response.userDetails.username, email: response.userDetails.email}));

            setAlert({message: `Welcome back ${response.userDetails.username.split(" ")[0]}`, type:"success"});

            navigate('/');
        } else {
            // display error message
            setAlert({message:response.error, type:"danger"});
        }
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
                    <input onChange={handleChangeEmail} type="email" className={`form-control ${ mode.current === "dark"? "textBoxDark" : "" } `} name="email" id="email" placeholder='Enter Email' required 
                   />
                </div>
                
                <div className="mb-3">
                    <input onChange={handleChangePassword} type="password" className={`form-control ${ mode.current === "dark"? "textBoxDark" : "" } `} name="password" id="password" placeholder='Enter Password' required 
                    />
                </div>
                
                <button type="submit " className=" btn-form" >Sign in</button>
            </form >
        </motion.div>
    )
}

export default SignIn;
