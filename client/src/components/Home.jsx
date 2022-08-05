import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, getAllTemperament, filterTemperaments, filterCreated, orderByName, orderByWeight } from '../redux/actions/actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import style from '../modulesCss/home.module.css';
import logo from '../assets/logo.svg';

export default function Home(){
    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.dogs);
    const allTemperaments = useSelector(state => state.temperaments);

    const [orden, setOrden] = useState('') //orden
    const [page, setPage] = useState(1); //paginado
    const [ dogsPerPage, setDogsPerPage] = useState(8); //cards por pagina
    const dogsPage = allDogs.slice((page - 1) * dogsPerPage, (page - 1) * dogsPerPage + dogsPerPage);

    const paginado = (pageNumber) => {
        setPage(pageNumber) 
    }

    useEffect(() => {
        dispatch(getAllDogs());
        dispatch(getAllTemperament())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getAllDogs());
    }

    function handleFilterTemp(e){
        e.preventDefault();
        dispatch(filterTemperaments(e.target.value));
        setPage(1);
    }

    function handleFilterCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        setPage(1);
    }

    function handleOrderAlfhabetic(e) {     //TRASLADAR AL BACK
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setPage(1);
        setOrden(`Orden ${e.target.value}`)
    }

    function handleOrderByWeight(e){        //TRASLADAR AL BACK
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setPage(1);
        setOrden(`Orden ${e.target.value}`)
    }

    return(
        <div className={style.wrapperAll}> 
            <div className={style.conteinerHeader}>
                <div className={style.title}>
                    <h1>Henry's Dogs</h1>
                    <p>Find your 4-legged friend</p>
                </div>
                <Link to='/dog' className={style.newDog}>
                    <button className={style.buttonCreated}>Add a breed</button>
                </Link>
            </div>
            <div className={style.conteinerBody}>
                <div className={style.conteinerFiltersOrders}>
                    <label>Order by: </label>
                    <select className={style.selectAlfabethic} onChange={e => {handleOrderAlfhabetic(e)}}>
                        <option value='By Alfabhetic'> Alfabethic </option>
                        <option value='a-z'> A - Z </option>
                        <option value='z-a'> Z - A </option> 
                    </select>
                    <select onChange={e => handleOrderByWeight(e)}>
                        <option value='By weight'>Weight</option>
                        <option value='asc'>Higher to lower</option>
                        <option value='des'>Lower to higher</option>
                    </select>
                    <label>Filter by: </label>
                    <select onChange={e => handleFilterCreated(e)}>
                        <option value='all'>All</option>
                        <option value='created'>Created</option>
                        <option value='api'>Default</option>
                    </select>
                    <select onChange={e => handleFilterTemp(e)}>
                        <option value='Select Temperament...'>Select Temperament...</option>
                        {allTemperaments && allTemperaments.map(el => {
                            return <option value={el.name}>{el.name}</option>
                        })}
                    </select>
                    <SearchBar/>
                    <button className={style.buttonRefresh} onClick={e => {handleClick(e)}}>Refresh</button>
                </div>
                <div className={style.conteinerRight}>
                    <div className={style.conteinerCards}>
                        {dogsPage.length ? dogsPage.map( el => {
                            console.log(dogsPage, 'ERRROR')
                            return (
                                <div className={style.cards}>
                                    <Link to={`/home/${el.id}`}>
                                        <Card name={el.name} image={el.image} weight={el.weight} temperament={el.temperament}/>
                                    </Link>
                                </div>
                            )
                        }) 
                        : <p>Cargando...</p>}
                    </div>
                    <Paginado paginado={paginado} dogsPerPage={dogsPerPage} allDogs={allDogs} page={page}/>
                </div>
            </div>
        </div>
    )
}
