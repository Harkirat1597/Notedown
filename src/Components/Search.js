import React, {useContext} from 'react';
import NoteContext from '../Context/notes/NoteContext';

const Search = () => {

    const context = useContext(NoteContext);
    const{originalNotes, searchNote, setNotes} = context;

    const handleChange = async (e) => {
        const text = e.target.value;
        setTimeout(() => {
            searchNote(text);
        },300)
    }

    return (
        <>
            <div className="container-search">
                <input className="input-search" type="text" id="search-bar" name="search-bar" placeholder='Search...' onChange={handleChange}/>
                <img src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/search-icon.png" className="search-icon" />
            </div>
        </>
    )
}

export default Search;