import React from 'react';
import {Link } from 'react-router-dom';
import {motion} from 'framer-motion';

import Notes from './Notes.js';

const Home = (props) => {
    const {mode} = props;

    return (
        <motion.div

        initial={{opacity: 0 }}
        animate={{opacity: 1, transition: {duration: 0.5} }}
        exit={{opacity: 0,  transition: {duration: 0} }}
        >
            {
            
            localStorage.getItem('auth') ?

                <div className="container-my mt-3">
                    <Notes mode={mode}/>
                </div>

                :

                // <div className="container-home">
                //     <h1 className='mg-3 center-text'>Welcome to <span className="home-text-highlight">NoteDown</span></h1>
                //     <Link className="nav-btn btn-wide my-2" to="/signup">Start now</Link>
                // </div>
                <>
                    <div className={`container-home ${mode.current === "dark"? "dark": ""}`} >
                        <h2 className='center-text'>
                            Welcome to <span className="home-text-highlight">NoteDown</span>
                        </h2>
                        <h2 className='mg-3 center-text'>
                            Organize all your work, NoteDown all your notes
                        </h2>
                        <div style={{minWidth: "150px"}}> 
                            <p className="center-text p">
                                Remember everything and tackle your workflow with your notes, important tasks and as your main companion all in one place. 
                            </p>
                        </div>
                        <Link className="nav-btn btn-wide my-2" to="/signup">Start now</Link>
                    </div>
                    
                {/* <div className="container-full-width" style={{border: "1px solid blue"}}></div> */}
                </>
            }
        </motion.div>
    )
}

export default Home;


  
  