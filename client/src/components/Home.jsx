import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, getAllTemperament, filterTemperaments, filterCreated, orderByName, orderByWeight } from '../redux/actions/actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import style from '../modulesCss/home.module.css'

export default function Home(){
    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.dogs);
    const allTemperaments = useSelector(state => state.temperaments);

    //------
    const [filter, setFilter] = useState('') //filtro
    //------

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
        //-------------
        setFilter(e.target.value);
    }

    function handleFilterCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        setPage(1);
        //-------------
        setFilter(e.target.value);
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
        <div className={style.conteiner}> 
            <div className={style.conteinerHeader}>
                <h1>Henry's Dogs</h1>
                <Link to='/dog' className={style.newDog}>
                    <button className={style.button}>Agregar raza</button>
                </Link>
            </div>
            <div className={style.conteinerBody}>
                <div className={style.conteinerFiltersOrders}>
                    <SearchBar/>
                    <button onClick={e => {handleClick(e)}}>All dogs</button>
                    <select onChange={e => {handleOrderAlfhabetic(e)}}>
                        <option value='By Alfabhetic'> By Alfabhetic </option>
                        <option value='a-z'> A - Z </option>
                        <option value='z-a'> Z - A </option> 
                    </select>
                    <select onChange={e => handleOrderByWeight(e)}>
                        <option value='By weight'>Por peso</option>
                        <option value='asc'>Ascendente</option>
                        <option value='des'>Descendiente</option>
                    </select>
                    <select onChange={e => handleFilterCreated(e)}>
                        <option value='all'>All</option>
                        <option value='created'>Creados</option>
                        <option value='api'>Existentes</option>
                    </select>
                    <select onChange={e => handleFilterTemp(e)}>
                        <option value='Select Temperament...'>Select Temperament...</option>
                        {allTemperaments && allTemperaments.map(el => {
                            return <option value={el.name}>{el.name}</option>
                        })}
                    </select>
                </div>
                <div className={style.conteinerRight}>
                    <Paginado paginado={paginado} dogsPerPage={dogsPerPage} allDogs={allDogs} page={page}/>
                    <div className={style.conteinerCards}>
                        {dogsPage.length ? dogsPage.map( el => {
                            return (
                                <div>
                                    <Link to={`/home/${el.id}`}>
                                    <Card name={el.name} image={el.image} weight={el.weight} temperament={el.temperament}/>
                                    </Link>
                                </div>
                            )
                        }) 
                        : <p>Cargando...</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}
