import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailId, clearDetail } from '../redux/actions/actions';

export default function CardDetail(){
    const dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {
        dispatch(getDetailId(id));
        dispatch(clearDetail());
    }, [dispatch]);

    const idDog = useSelector( state => state.detail);
    
    return(
        <div>
            {idDog.length > 0 ? 
            <div>
                <h1>{idDog[0].name}</h1>
                <img src={idDog[0].image}/>
                <p><b>Temperaments: </b>{idDog[0].temperament ? idDog[0].temperament : idDog[0].temperaments.map( e => e.name).toString() }</p>
                <p><b>Weight: </b>{idDog[0].weight}</p>
                <p><b>Height: </b>{idDog[0].height}</p>
                <p><b>Life Span: </b>{idDog[0].life_span}</p>
            </div> 
            : <p>Error al cargar datos</p>
            }
            <Link to='/home/'><button>Ir a Home</button></Link>
        </div>
    )
}