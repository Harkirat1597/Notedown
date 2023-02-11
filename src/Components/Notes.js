import React, { useContext, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteItem from './NoteItem.js';
// import AddNote from './AddNote.js';
import Search from './Search.js';
import AlertContext from '../Context/alert/AlertContext.js';
import NoteContext from '../Context/notes/NoteContext.js';

const Notes = ({ mode }) => {
    const { notes, authToken, editNote, getNotes, addNote, loading } = useContext(NoteContext);
    const { setAlert } = useContext(AlertContext);

    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });
    const [newNote, setNewNote] = useState({ addtitle: "", adddescription: "", addtag: "" });

    const refShowModalEdit = useRef(null);
    const refCloseModalEdit = useRef(null);

    const refShowModalNew = useRef(null);
    const refCloseModalNew = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!authToken) {
            navigate('/signin');
        };
        getNotes();
    }, []);

    const updateNote = (newNote) => {
        refShowModalEdit.current.click();
        setNote({ id: newNote.id, etitle: newNote.title, edescription: newNote.description, etag: newNote.tag });
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handleClickSave = (e) => {
        editNote({ id: note.id, title: note.etitle, description: note.edescription, tag: note.etag });
        setAlert({ message: "Note updated", type: "success" });
        refCloseModalEdit.current.click();
    }

    const onChangeNew = (e) => {
        setNewNote({ ...newNote, [e.target.name]: e.target.value });
        console.log(setNewNote);
    }

    const handleNewNoteClick = (e) => {
        e.preventDefault();
        setNewNote({ addtitle: "", adddescription: "", addtag: "" });
        refShowModalNew.current.click();
    }

    const handleClickAddNew = (e) => {
        if (!newNote.addtitle && !newNote.adddescription && !newNote.addtag) {
            setAlert({ message: "Nothing to add", type: "danger" });
            return;
        }
        addNote({ title: newNote.addtitle, description: newNote.adddescription, tag: newNote.addtag });
        setAlert({ message: "Note added", type: "success" });
        refCloseModalNew.current.click();
    }

    return (
        <div>
            {/* FOR EDIT */}
            <button type="button" className="btn btn-primary" ref={refShowModalEdit} style={{ display: 'none' }} data-bs-toggle="modal" data-bs-target="#editModal">
                Launch demo modal
            </button>

            <div className={`modal fade`} id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content"
                        style={{ backgroundColor: mode.current === "dark" ? `rgb(33,37,41)` : "" }}>
                        <div className="modal-header">
                            <p className="modal-title" id="exampleModalLabel">Edit Note</p>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <input type="text" 
                                className={`input-field input-add-new-note my-2 ${mode.current === "dark" ? "textBoxDark-lightborder" : ""}`} 
                                value={note.etitle} 
                                id="etitle" 
                                name="etitle" 
                                placeholder="title" 
                                onChange={onChange} 
                                style={{ border: mode.current === "dark" ? "none" : "0.5px solid light grey" }} 
                            />
                            
                            <textarea type="text" 
                                className={`input-field input-add-new-note my-2  textarea-desc ${mode.current === "dark" ? "textBoxDark-lightborder" : ""}`} 
                                value={note.edescription} id="edescription" 
                                name="edescription" placeholder="description" 
                                rows="6" 
                                onChange={(e) => { onChange(e) }} 
                                style={{ border: mode.current === "dark" ? "none" : "0.5px solid light grey" }} 
                            />
                        </div>

                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                ref={refCloseModalEdit} 
                                style={{ display: 'none' }} data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            
                            <button 
                                type="button" 
                                className="btn-form" 
                                onClick={handleClickSave} 
                                style={{ outline: "none", border: "none" }} 
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {/* FOR NEW ADD */}
            <button  
                className="btn btn-primary" 
                ref={refShowModalNew} 
                style={{ display: 'none' }} 
                data-bs-toggle="modal" 
                data-bs-target="#addNewModal"
            >
                Launch demo modal
            </button>

            <div className="modal fade" id="addNewModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content"
                        style={{ backgroundColor: mode.current === "dark" ? `rgb(33,37,41)` : "" }}>
                        <div className="modal-header">
                            <p className="modal-title" id="exampleModalLabel">Add Note</p>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <input type="text" className={`input-field input-add-new-note my-2  ${mode.current === "dark" ? "textBoxDark-lightborder" : ""}`} value={newNote.addtitle} id="addtitle" name="addtitle" placeholder="Add title..." onChange={onChangeNew} style={{ border: mode.current === "dark" ? "none" : "0.5px solid light grey" }} />
                            <textarea type="text" className={`input-field input-add-new-note my-2 textarea-desc  ${mode.current === "dark" ? "textBoxDark-lightborder" : ""}`} value={newNote.adddescription} id="adddescription" name="adddescription" placeholder="Add description..." rows="6" onChange={(e) => { onChangeNew(e) }} style={{ border: mode.current === "dark" ? "none" : "0.5px solid light grey" }} />

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refCloseModalNew} style={{ display: 'none' }} data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn-form" onClick={handleClickAddNew} style={{ outline: "none", border: "none" }} >Save</button>
                        </div>
                    </div>
                </div>
            </div>

            <Search />

            <div className="row my-3">
                <div className="col-md-3 my-2 " onClick={handleNewNoteClick} style={{ color: mode.current === "dark" ? "black" : "" }}>
                    <div className="card my-card-notes note to-add-note " style={{ cursor: "pointer" }} >
                        <div className="card-body addNote-card-body">
                            <p>Click here to add new note...</p>
                            <i className="fa-solid fa-plus add-note-icon"></i>
                        </div>
                    </div>
                </div>


                
                

                {/* {loading && 
                    <div className='col-md-3 my-2' style={{ display: mode.current === "dark" ? "" : "none" }}>
                        
                    </div>} */}


                {!loading &&
                    notes.map((note) => {
                        return <NoteItem key={note.id} mode={mode} note={note} updateNote={updateNote} />
                    })
                }

                {loading === true &&
                    <div className='col-md-3 my-2' >
                        {/* For light mode */}
                        <div className="card my-card-notes note card-loader is-loading"  style={{ display: mode.current == "dark" ? "none" : " "}}>
                            <div className="image">
                                <div className="content">
                                    <h2></h2>
                                    <p></p>
                                </div>
                            </div>
                        </div>


                        {/* For dark mode */}
                        <div className="card my-card-notes note  card-loader-dark is-loading-dark"  style={{ display: mode.current == "dark" ? "" : "none"}}>
                            <div className="image-dark">
                                <div className="content-dark">
                                    <h2></h2>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default Notes;