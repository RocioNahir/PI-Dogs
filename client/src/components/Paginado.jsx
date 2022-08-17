
import React from 'react';
import { useState } from 'react';
import style from '../modulesCss/paginado.module.css'

export default function Paginado({paginado, dogsPerPage, allDogs, page}){

    const [pageLimit, setPageLimit] = useState(10);
    const [maxPageLimit, setMaxPageLimit] = useState(10);
    const [minPageLimit, setMinPageLimit] = useState(0);

     
    const pageNumber = [];
    for(let i = 1; i <= Math.ceil(allDogs && allDogs.length/dogsPerPage); i++){
        pageNumber.push(i)
    }
    console.log(pageNumber)

    const indice = pageNumber && pageNumber.map(pag => {
        if(pag <= maxPageLimit  && pag > minPageLimit){  
            return <a className={pag === page ? style.active : style.x} onClick={() => paginado(pag)}>{pag}</a>
        } else return null;
        
    })

    const handlePrevButton = () => {
        paginado(prev => prev === 1 ? prev : prev - 1); 

        if(page !== 1 && (page - 1) % pageLimit === 0){
            setMaxPageLimit(maxPageLimit - pageLimit);
            setMinPageLimit(minPageLimit - pageLimit);
        }
    }

    const handleNextButton = () => {
        paginado(next => next === pageNumber.length ? next : next + 1 );   

        if(page + 1 > maxPageLimit){
            setMaxPageLimit(maxPageLimit + pageLimit);
            setMinPageLimit(minPageLimit + pageLimit);
        }
    }

    return(
        <div className={style.paginationConteiner}> 
            <a className={page <= 1 ? style.disabledPrev : style.paginationPrev } onClick={() => handlePrevButton()}>Prev</a>
            
            {indice}
            
            <a className={page >= pageNumber.length ? style.disabledNext : style.paginationNext } onClick={() => handleNextButton()}>Next</a>
        </div>
    )
}
