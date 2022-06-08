import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { createDog, getAllTemperament,  } from '../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import style from '../modulesCss/form.module.css';

export default function DogCreate(){
    const dispatch = useDispatch();
    const temperament = useSelector((state) => state.temperaments)

    const [input, setInput] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        life_span: '',
        temperament: [], 
    })

    const [error, setError] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        life_span: '',
    })

    function handleChange(e){
        setInput((prevState) => {
            const newState = {              
                ...prevState,
                [e.target.name] : e.target.value
            };
            setError(validate(newState));    
            return newState;
        })
    }

    function handleSelect(e){
        setInput({
            ...input,
            temperament: [...input.temperament,e.target.value]
        })
    }

    function handleDelete(el){
        setInput({
            ...input,
            temperament: input.temperament.filter( temp => temp !== el)
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        if(input.name === '' && input.heightMin === '' && input.heightMax === '' && input.weightMin === '' && input.weightMax === '') {
            alert('Falta completar datos necesarios')
        }
        else if(!error.name && !error.heightMin && !error.heightMax && !error.weightMin && !error.weightMax && !error.life_span){
            dispatch(createDog(input));
            alert('Raza agregada!')
            setInput({
                name: '',
                heightMin: '',
                heightMax: '',
                weightMin: '',
                weightMax: '',
                life_span: '',
                temperament: []
            });
        }  else {alert('Hubo un error en el formulario, intentalo otra vez')}
    }

    function validate(input){
        const errors = {};
        const onlyWord = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
        const onlyNumbers = /^\d*$/;

        if(!input.name){
            errors.name = 'Name is required';
        } else {
            if(!onlyWord.test(input.name)) {errors.name = 'Name is invalid';}
        }

        if(!input.heightMin){
            errors.heightMin = 'Min. Height is required';
        } else {
            if (!onlyNumbers.test(input.heightMin)){ errors.heightMin = 'Min. Height must be a number';}
            else if (parseInt(input.heightMin) >= parseInt(input.heightMax)){ errors.heightMin = 'Must be less than maximun height';}
            else if (input.heightMin < 0) { errors.heightMin = 'Min. Height is invalid';}
        }

        if(!input.heightMax){
            errors.heightMax = 'Max. Height is required';
        } else if(!onlyNumbers.test(input.heightMax)){
            errors.heightMin = 'Maximun Height is invalid';
        }

        if(!input.weightMin){
            errors.weightMin = 'Min. Weight is required';
        } else {
            if (!onlyNumbers.test(input.weightMin)) { errors.weightMin = 'Min. Weight must be a number'}
            else if(parseInt(input.weightMin) >= parseInt(input.weightMax)) { errors.weightMin = 'Must be less than maximun weight' }
            else if (input.weightMin < 0) { errors.heightMin = 'Min. Weight is invalid';}
        }

        if(!input.weightMax){
            errors.weightMax = 'Max. Weight is required';
        } else if (!onlyNumbers.test(input.weightMax) && parseInt(input.weightMin) >= parseInt(input.weightMax)) {
            errors.weightMin = 'Must be greater than minimun weight'
        }

        if(!onlyNumbers.test(input.life_span)) {
            errors.life_span = 'Must be numbers'
        } else if(parseInt(input.life_span) < 0){
            errors.life_span = 'Life Span must be greater than zero'
        }

        return errors
    }

    useEffect(() => {
        setError(
          validate({
            ...input,
          })
        );
    }, [input, dispatch]);

    useEffect(() => {
        dispatch(getAllTemperament());
    }, []);

    return( 
        <div className= {style.conteiner}>
            <Link to='/home'><button className={style.buttonHome}>Volver a Home</button></Link>
            <br/>
            <div className={style.conteinerForm}>
                <h1>Crea tu raza</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label>Name: </label>
                        <input 
                            type='text' 
                            name='name' 
                            value={input.name} 
                            placeHolder='ej:Akita' 
                            className={error?.name && style.borderDanger}
                            onChange={(e) => handleChange(e)}
                        />
                        {error.name && (<span className={style.danger}>{error.name}</span>)}
                    </div>
                    <div>
                        <label>Height Minimo: </label>
                        <input 
                            type='number' 
                            name='heightMin' 
                            value={input.heightMin} 
                            placeHolder='ej:10' 
                            className={error?.heightMin && style.borderDanger}
                            onChange={(e) => handleChange(e)}
                        />
                        {error.heightMin && (<span className={style.danger}>{error.heightMin}</span>)}
                    </div>
                    <div>
                        <label>Height Maximo: </label>
                        <input 
                            type='number' 
                            name='heightMax' 
                            value={input.heightMax} 
                            placeHolder='ej:30' 
                            className={error?.heightMax && style.borderDanger}
                            onChange={(e) => handleChange(e)}
                        />
                        {error.heightMax && (<span className={style.danger}>{error.heightMax}</span>)}
                    </div>
                    <div>
                        <label>Weight Minimo: </label>
                        <input 
                            type='number'
                            name='weightMin' 
                            value={input.weightMin}                   
                            placeHolder='ej:1' 
                            className={error?.weightMin && style.borderDanger}
                            onChange={(e) => handleChange(e)}
                        />
                        {error.weightMin && (<span className={style.danger}>{error.weightMin}</span>)}
                    </div>
                    <div>
                        <label>Weight Maximo: </label>
                        <input 
                            type='number' 
                            name='weightMax'
                            value={input.weightMax} 
                            placeHolder='ej:2' 
                            className={error?.weightMax && style.borderDanger}
                            onChange={(e) => handleChange(e)}
                        />
                        {error.weightMax && (<span className={style.danger}>{error.weightMax}</span>)}
                    </div>
                    <div>
                        <label>Life Span: </label>
                        <input 
                            type='number'
                            name='life_span' 
                            value={input.life_span} 
                            placeHolder='ej:16' 
                            className={error?.life_span && style.borderDanger}
                            onChange={(e) => handleChange(e)}
                        /> 
                        {error.life_span && (<span className={style.danger}>{error.life_span}</span>)}
                    </div>
                    <div>
                        <label>Temperament: </label>
                        <select onChange={(e) => handleSelect(e)}>
                            <option value='Select Temperament...'>Select Temperament...</option>
                            {temperament && temperament.map(el => {
                                return <option value={el.name}>{el.name}</option>
                            })}
                        </select> 
                    </div>
                    {!error.name && !error.heightMin && !error.heightMax && !error.weightMin && !error.weightMax ? 
                        <button type='submit' className={style.buttonCreate}>Crear!</button>
                     : <button type='submit' disabled className={style.buttonCreateDisabled}>Crear!</button>}
                </form>
                <div className={style.containerTemperaments}>
                    {input.temperament.map(el => 
                        <div className={style.containerTemperament}>
                            <p>{el}</p>
                            <button className={style.buttonTemperament} onClick={() => handleDelete(el)}>X</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}