import React from 'react';
import { Link } from 'react-router-dom';
import style from '../modulesCss/landingPage.module.css';

export default function LandingPage(){
    return (
        <div className={style.background}>
            <div className={style.container}>
                <h1 className={style.titulo}>¡Welcome!</h1>
                <p>Search and meet new breeds of dogs</p>
                <div>
                    <Link to='/home'>
                        <a className={style.button}>Let's go</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}