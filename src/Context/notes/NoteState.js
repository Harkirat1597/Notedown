import React, { useState } from 'react';
import NoteContext from './NoteContext.js';

const base_url = "https://home-running.run-ap-south1.goorm.app/";

const NoteState = (props) => {
    const notesInitial = [];
    const [authToken, setAuthToken] = useState(() => {
        const auth = localStorage.getItem('auth');
        if (!auth) return "";
        return auth;
    })
    const [user, setUser] = useState(() => {
        const auth = localStorage.getItem('auth');
        const res = JSON.parse(localStorage.getItem('userdetails'));
        if (!auth) return {};
        return res;
    });
    const [notes, setNotes] = useState(notesInitial);
    const [originalNotes, setOriginalNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    const createAccount = async (user) => {
        if (!user) return;

        // username, email, password, confirmPassword

        const res = await fetch(`${base_url}api/auth/sign-up`, {
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

        if (!response.success) return response;
        else return response;
    }


    const signIn = async (user) => {
        const res = await fetch(`${base_url}api/auth/sign-in`, {
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify({
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
            setUser(response.userDetails);
            localStorage.setItem('auth', response.jsontoken);
            setAuthToken(response.jsontoken);
            localStorage.setItem('userdetails', JSON.stringify({ username: response.userDetails.username, email: response.userDetails.email }));
        }

        return response;
    }


    const signOut = () => {
        localStorage.removeItem('auth');
        localStorage.removeItem('userdetails');
        setAuthToken("");
        setUser({});
        clearAllPreviousData();
        return {success: true, message: "See you soon"};
    }


    const changePassword = async (oldpass, newpass) => {
        const res = await fetch(`${base_url}api/auth/changePassword`, {
            method: "PUT",
            
            // Adding body or contents to send
            body: JSON.stringify({
                oldpass: `${oldpass}`,
                newpass: `${newpass}`,
                email: `${user.email}`
            }),
             
            // Adding headers to the request
            headers: {
                "auth-token": authToken,
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        const response = await res.json();
        return response;
    }


    const getNotes = async () => {
        setLoading(true);

        const res = await fetch(`${base_url}api/notes/all-notes/`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "auth-token": `${localStorage.getItem('auth')}`
            }
        });
        const response = await res.json();

        setLoading(false);

        if (response.success) {
            setNotes(response.notes);
            setOriginalNotes(response.notes);
        } else {
            // console.log(response.error);
        }
    }


    const addNote = async (noteToAdd) => {
        const { title, description, tag } = noteToAdd;

        const res = await fetch(`${base_url}api/notes/add-note`, {
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
                const res = await fetch(`${base_url}api/notes/update-note/${note.id}`, {
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
                break;
            }
        }
    }

    const deleteNote = async (id) => {
        const newNotes = notes.filter((note) => note.id !== id);

        setNotes(newNotes);

        const res = await fetch(`${base_url}api/notes/delete-note/${id}`, {
            method: "DELETE",

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "auth-token": `${localStorage.getItem('auth')}`
            }
        });
        const response = await res.json();
        return response;
    }

    const searchNote = async (text) => {
        if (text.length <= 1) {
            setNotes(originalNotes);
            return;
        }

        setLoading(true);

        const res = await fetch(`${base_url}api/notes/search-note/${text}`, {
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
            // console.log(response.error);
        }
    }

    const updateTag = async ({ noteId, imp }) => {
        const res = await fetch(`${base_url}api/notes/update-tag/${noteId}`, {
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
        return response;
    }

    const clearAllPreviousData = () => {
        setOriginalNotes([]);
        setNotes(notesInitial);
    }

    let value = { 
        user,
        changePassword,
        clearAllPreviousData, 
        createAccount,
        signIn, 
        signOut,
        authToken,
        originalNotes, 
        updateTag, 
        setNotes, 
        notes, 
        addNote, 
        editNote, 
        deleteNote, 
        getNotes, 
        searchNote, 
        loading, 
        setLoading 
    }

    return (
        <NoteContext.Provider value={value}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;