import React, { useContext, useState } from 'react';
import NoteContext from './NoteContext.js';

const NoteState = (props) => {
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);
    
    const [originalNotes, setOriginalNotes] = useState([]);

    const [loading, setLoading] = useState(false);


    const createAccount = async (user) => {
        if (!user) return;

        // username, email, password, confirmPassword

        const res = await fetch(`https://jupyter-poydg.run-ap-south1.goorm.io/api/auth/sign-up`, {
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify({
                username: `${user.username}`,
                email: `${user.email}`,
                password: `${user.password}`
            }),
             
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        const response = await res.json();

        if (response.success) {
            return true;
        } else {
            return false;
        }
    }

    const getNotes = async () => {

        setLoading(true);
        
        const res = await fetch(`https://jupyter-poydg.run-ap-south1.goorm.io/api/notes/all-notes/`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "auth-token": `${localStorage.getItem('auth')}`
            }
        });
        const response = await res.json();
        console.log(response);
        
        setLoading(false);
        
        if (response.success) {
            setNotes(response.notes);
            setOriginalNotes(response.notes);
        } else {
            console.log(response.error);
        }
    }


    const addNote = async (noteToAdd) => {
        const { title, description, tag } = noteToAdd;

        const res = await fetch(`https://jupyter-poydg.run-ap-south1.goorm.io/api/notes/add-note`, {
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify({
                title: `${title}`,
                description: `${description}`,
                tag: `${tag}`
            }),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "auth-token": `${localStorage.getItem('auth')}`
            }
        });
        const response = await res.json();
        console.log(response);
        if (response.success) {
            getNotes();
        } else {
            
        }
    }

    const editNote = async (note) => {
        // For FRONTEND updation.
        let newNotes = [...notes];
        for (let i = 0; i < newNotes.length; i++) {
            if (note.id === newNotes[i].id) {
                newNotes[i].title = note.title;
                newNotes[i].description = note.description;
                newNotes[i].tag = note.tag;
                
                setNotes(newNotes);
                console.log("Access Note");
                console.log(note.title + " "+ note.description + " " + note.tag);
                const res = await fetch(`https://jupyter-poydg.run-ap-south1.goorm.io/api/notes/update-note/${note.id}`, {
                    method: "PUT",
                    // Adding body or contents to send
                    
                    body: JSON.stringify({
                        title: `${note.title}`,
                        description: `${note.description}`,
                        tag: `${note.tag}`
                    }),

                    // Adding headers to the request
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "auth-token": `${localStorage.getItem('auth')}`
                    }
                });

                const response = await res.json();

                if (response.success) {
                    console.log("Note edited at the backend");
                } else {
                    console.log(response.error);
                }
                break;
            }
        }
    }

    const deleteNote = async (id) => {
        const newNotes = notes.filter((note) => note.id !== id);

        setNotes(newNotes);

        const res = await fetch(`https://jupyter-poydg.run-ap-south1.goorm.io/api/notes/delete-note/${id}`, {
            method: "DELETE", 

             // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "auth-token": `${localStorage.getItem('auth')}`
            }
        });

        const response = await res.json();

        if (response.success) {
            console.log("Note deleted successfully");
        } else {
            console.log(response.error);
        }
    }

    const searchNote = async (text) => {
        if (text.length <= 1) {
            setNotes(originalNotes);
            return;
        }

        setLoading(true);

        const res = await fetch(`https://jupyter-poydg.run-ap-south1.goorm.io/api/notes/search-note/${text}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "auth-token": `${localStorage.getItem('auth')}`
            }
        });
        const response = await res.json();

        setTimeout(() => {
            setLoading(false);
        }, 500);

        if (response.success) {
            setNotes(response.notes);
            return;
        } else {
            console.log(response.error);
        }
    }

    const updateTag = async (obj) => {
        console.log(obj);

        const {noteId, imp} = obj;

        const res = await fetch(`https://jupyter-poydg.run-ap-south1.goorm.io/api/notes/update-tag/${noteId}`, {
            method: "PUT",
            
            body: JSON.stringify({
                tag: `${imp}`
            }),
            
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "auth-token": `${localStorage.getItem('auth')}`
            }
        });
        const response = await res.json();

        if (response.success) {
            console.log(response);
        } else {
            console.log(response.error);
        }
    }

    const clearAllPreviousData = () => {
        setOriginalNotes([]);
        setNotes(notesInitial);
    }

    return (
        <NoteContext.Provider value={{clearAllPreviousData, createAccount, originalNotes, updateTag, setNotes, notes, addNote, editNote, deleteNote, getNotes, searchNote, loading, setLoading}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;