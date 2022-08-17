import React from 'react';
import style from '../modulesCss/card.module.css'

export default function Card({name, image, temperament, weight}){

    const divStyle = 
        image !== '' 
        ? {
            backgroundImage: 'url(' + image + ')',
            backgroundPosition: 'left',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '300px'}
        : {
            backgroundImage: 'url("https://images.unsplash.com/photo-1485981133625-f1a03c887f0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")',
            backgroundPosition: 'left',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '300px',
        };

    const wrapperText = {
        background: "linear-gradient(90deg, rgba(255,255,255,0) 19%, rgba(251,251,251,1) 68%, rgba(249,249,249,1) 97%)",
    }

    return(
        <div className={style.wrapperCard}>
            <div className={style.card} style={divStyle}>
                <div className={style.wrapperText1} style={wrapperText}>
                    <h3>{name}</h3> 
                    <p><b>Weight: </b>{weight}</p>
                    <p><b>Temperaments: </b>{temperament}</p>
                </div>
            </div>
        </div>
    )
}