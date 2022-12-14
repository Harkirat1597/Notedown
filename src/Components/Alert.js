import React, {useContext, useEffect, useState} from "react";
import AlertContext from "../Context/alert/AlertContext";

const Alert = () => {
    const context = useContext(AlertContext);

    const {alert} = context;

    const [visibleCurr, setVisibility] = useState("");

    useEffect(() => {
        setVisibility("visible");
        setTimeout(() => {
            setVisibility("hidden");
        },3000);
    }, [alert]);
    
    return(
        <>
            <div className={`alert alert-${alert.type}`} style={{visibility:visibleCurr}} role="alert">
                {alert.message}
            </div>
        </>
    )
}

export default Alert;