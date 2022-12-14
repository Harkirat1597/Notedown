import React, {useState, useContext} from 'react';
import AlertContext from '../Context/alert/AlertContext';

const ChangePassword = (props) => {
    const {setFlag, mode} = props;

    const [input, setInput] = useState({oldpass: "", newpass: "", confirmpass: ""});

    const alertContext = useContext(AlertContext);
    const {setAlert} = alertContext;

    const helperClose = (e) => {
        setTimeout(() => {
            setFlag(false);
        }, 3000);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (input.newpass !== input.confirmpass) {
            const errMsg = "Password and confirm password do not match.";
            setAlert({message: errMsg, type:"danger"});
            return;
        }

        const details = JSON.parse(localStorage.getItem('userdetails'));
        const authtoken = localStorage.getItem('auth');

        const res = await fetch(`https://jupyter-poydg.run-ap-south1.goorm.io/api/auth/changePassword`, {
            method: "PUT",
            
            // Adding body or contents to send
            body: JSON.stringify({
                oldpass: `${input.oldpass}`,
                newpass: `${input.newpass}`,
                email: `${details.email}`
            }),
             
            // Adding headers to the request
            headers: {
                "auth-token": authtoken,
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const response = await res.json();

        if (response.success) {
            setAlert({message: response.message, type:"success"});
            helperClose(e);
        } else {
            setAlert({message: response.error, type: "danger"});
        }
        return;
    }

    const handleChange = (e) => {
        setInput({...input, [e.target.name] : e.target.value});
        console.log(input);
    }

    return (
        <>
            <form onSubmit={handleSubmit}
            className={`form-users-cre`}
            style={{borderTop: "none"}}>

                <div style={{display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", width: "250px", height: "200px"}}>
                
                    <div className="mb-3">
                        <input type="text" className={`form-control ${mode.current === "dark"? "textBoxDark": ""}`} name="oldpass" id="oldpass" placeholder='Old password' required 
                    onChange={handleChange}/>
                    </div>
                    
                    <div className="mb-3">
                        <input type="password" className={`form-control ${mode.current === "dark"? "textBoxDark": ""}`} name="newpass" id="newpass" placeholder='New password' required 
                    onChange={handleChange}/>
                    </div>
                    
                    <div className="mb-3">
                        <input type="password" className={`form-control ${mode.current === "dark"? "textBoxDark": ""}`} name="confirmpass" id="confirmpass" placeholder='Confirm password' required 
                    onChange={handleChange}/>
                    </div>
                
                </div>
                
                <button type="submit" className='btn-form' style={{width: "150px"}}>Change Password</button>
            
            </form>
        </>
    )
}

export default ChangePassword;