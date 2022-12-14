import React, { useContext, useState } from 'react';
import NoteContext from '../Context/notes/NoteContext.js';
import AlertContext from '../Context/alert/AlertContext.js';

const NoteItem = (props) => {
    const {note, updateNote, mode} = props;

    const context = useContext(NoteContext);
    const {deleteNote, updateTag} = context;
    
    const alertContext = useContext(AlertContext);
    const {setAlert} = alertContext;


    const alertDeleted = () => {
        setAlert({message:"Note deleted", type:"success"});
    }

    // Here note.tag === "false" means that if the note is marked as important from the backend.
    const [imp, setImp] = useState( note.tag === "false" ? true : false );
    const handleExtras = (e) => {
        if (!imp) {
            e.target.classList.remove('star-icon');
            setImp(true);
        }
        else {
            e.target.classList.add('star-icon');
            setImp(false);
        }
    }
    
    const updateStarMark = (note) => {
        updateTag({noteId:note.id, imp});
    }

    return (
        <>
        <div className="col-md-3 my-2" >
            <div className="card my-card-notes note" >
                <div className="card-body" style={{color: mode.current === "dark" ? "black": ""}}>
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className='card-btn-holder-div'>
                        <i className="fa-solid fa-trash-can del-icon" onClick={() => {deleteNote(note.id); alertDeleted()}} ></i>
                        <div style={{width: "50px", display:"flex", justifyContent:"space-between"}}>
                            <i className="fa-solid fa-pen-to-square edit-icon" onClick={() => updateNote(note)} ></i>
                            <i className="fa-solid fa-star star-icon"
                            style={{color: imp ? "red": "", opacity: imp ? "1" : ""}}
                            onClick={(e) => {handleExtras(e); updateStarMark(note)}}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default NoteItem;