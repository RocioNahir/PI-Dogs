import React from 'react';
import style from '../modulesCss/card.module.css'

export default function Card({name, image, temperament, weight}){
    return(
        <div className={style.card}>
            <h3>{name}</h3> 
            <div className={style.image}>
                <img src={image} alt="Not found" width="180px" height="130px"/>
            </div>
            <p><b>Weight: </b>{weight}</p>
            <p><b>Temperaments: </b>{temperament}</p>
        </div>
    )
}