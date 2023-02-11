import React, { useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import noteContext from '../Context/notes/NoteContext';

const Navbar = ( { mode } ) => {
    let location = useLocation();
    const { authToken, user } = useContext(noteContext);

    return (
        <nav className={`navbar navbar-expand-lg  ${mode.current === "light"? "navbar-light bg-light" : "navbar-dark bg-dark"}`} >
            
            <div className="container-fluid ">
                
                <div className='app-logo-div'>
                    <Link to='/' style={{textDecoration: "none"}}>
                        <p className='app-logo'>Note<span className='app-logo-highlighted'>Down</span></p>
                    </Link>
                </div>

               <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/" style={{ fontSize: "15px"}}></Link>
                        </li>
                    </ul>

                    {authToken ? 
                        <div className='d-flex'>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item" style={{paddingRight: "20px"}}>
                                    <Link className={`nav-link ${location.pathname === "/user" ? "active" : ""}`} aria-current="page" to="/user">
                                        <button className={`wrapper-user-icon  ${mode.current === "dark"? "dark": ""}`} style={{fontWeight: "bold", fontSize: "15px"}} >
                                            {user.username.charAt(0).toUpperCase()}
                                        </button>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    :
                        <form className="d-flex nav-btn-holder-div ">
                            <Link className="nav-btn my-2" to="/signin" type="submit">Signin</Link>
                            <Link className="nav-btn my-2" to="/signup" type="submit">Register</Link>
                        </form>
                    }
                    
                </div>
            </div>
        </nav>
    )
}

export default Navbar;