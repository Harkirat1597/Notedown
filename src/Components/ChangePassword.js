import React, { useState, useContext, useRef } from 'react';
import AlertContext from '../Context/alert/AlertContext';
import noteContext from '../Context/notes/NoteContext';

const ChangePassword = ({ setFlag, mode }) => {
    const { changePassword } = useContext(noteContext);

    const oldPassRef = useRef();
    const NewPassRef = useRef();
    const confirmPassRef = useRef(); 
    
    const { setAlert } = useContext(AlertContext);

    const helperClose = (e) => {
        setTimeout(() => {
            setFlag(false);
        }, 3000);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (NewPassRef.current.value !== confirmPassRef.current.value) {
            const errMsg = "Password and confirm password do not match.";
            setAlert({message: errMsg, type:"danger"});
            return;
        }

        const res = await changePassword(oldPassRef.current.value, NewPassRef.current.value); 

        if (!res.success) return setAlert({message: res.error, type: "danger"});

        setAlert({message: res.message, type:"success"});
        return helperClose(e);
    }

    return (
        <>
            <form onSubmit={handleSubmit}
            className={`form-users-cre`}
            style={{borderTop: "none"}}>

                <div style={{display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", width: "250px", height: "200px"}}>
                
                    <div className="mb-3">
                        <input type="text" className={`form-control ${mode.current === "dark"? "textBoxDark": ""}`} name="oldpass" id="oldpass" placeholder='Old password' required 
                        ref={oldPassRef}    
                    />
                    </div>
                    
                    <div className="mb-3">
                        <input type="password" className={`form-control ${mode.current === "dark"? "textBoxDark": ""}`} name="newpass" id="newpass" placeholder='New password' required 
                        ref={NewPassRef}    
                    />
                    </div>
                    
                    <div className="mb-3">
                        <input type="password" className={`form-control ${mode.current === "dark"? "textBoxDark": ""}`} name="confirmpass" id="confirmpass" placeholder='Confirm password' required 
                        ref={confirmPassRef}    
                    />
                    </div>
                
                </div>
                
                <button type="submit" className='btn-form' style={{width: "150px"}}>Change Password</button>
            
            </form>
        </>
    )
}

export default ChangePassword;