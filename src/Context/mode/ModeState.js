import React, { useState }  from "react";
import ModeContext from './ModeContext.js';

const ModeState = (props) => {
    const [mode, setMode] = useState("light");

    return (
        <ModeContext.Provider value={{mode, setMode}}>
            {props.children}
        </ModeContext.Provider>
    )
}

export default ModeState;
