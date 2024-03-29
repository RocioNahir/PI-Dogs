import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameDog } from '../redux/actions/actions';
import style from '../modulesCss/searchBar.module.css';

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('')

    function handleInputName(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameDog(name));
    }

    return (
        <div className={style.searchBar}>
            <input type='text' placeholder='Search name...' onChange={(e) => handleInputName(e)}/>
            <button type='submit' onClick={(e) => handleSubmit(e)}></button>
        </div>
    )
}