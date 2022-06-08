import React from 'react';
import { Link } from 'react-router-dom';
import style from '../modulesCss/landingPage.module.css';


export default function LandingPage(){
    return (
        <div className={style.background}>
            <h1 className={style.titulo}>¡Bienvenidxs!</h1>
            <div>
                <Link to='/home' className={style.link}>
                    <button className={style.button}>Ingresar</button>
                </Link>
            </div>
        </div>
    )
}