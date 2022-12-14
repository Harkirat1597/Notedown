import React, {useState, useContext} from 'react';
import NoteContext from '../Context/notes/NoteContext.js';

const AddNote = () => {
    const context = useContext(NoteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title:"", description:"", tag:""});

    const handleSaveNewNote = async (e) => {
        e.preventDefault();
        addNote(note);
        // console.log(note);
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            <div className="div-holder-add-note">
                <input type="text" className="input-add-new-note" id="title"  name="title" placeholder="title" onChange={onChange} />
                <input type="text" className="input-add-new-note" id="description" name="description" placeholder="description" onChange={onChange} />
                <button onClick={handleSaveNewNote}>Save</button>
            </div>
        </>
    );
}

export default AddNote;