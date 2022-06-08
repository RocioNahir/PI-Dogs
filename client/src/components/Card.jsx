import React from 'react';
import style from '../modulesCss/card.module.css'

export default function Card({name, image, temperament, weight}){
    return(
        <div className={style.card}>
            <h3>{name}</h3>
            <div className={style.image}>
                <img src={image} alt="Not found" width="200px" height="150px"/>
            </div>
            <p><b>Temperaments: </b>{temperament}</p>
            <p><b>Weight: </b>{weight}</p>
        </div>
    )
}