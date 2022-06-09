import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailId, clearDetail, clearCards } from '../redux/actions/actions';
import style from '../modulesCss/cardDetail.module.css';

export default function CardDetail(){
    const dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {
        dispatch(getDetailId(id));
        dispatch(clearDetail());
        dispatch(clearCards());
    }, [dispatch]);

    const idDog = useSelector( state => state.detail);
    console.log(idDog)
    
    return(
        <div className={style.background}>
            {idDog.length > 0 ? 
            <div className={style.containerCard}>
                <div className={style.containerText}>
                    <div className={style.conteinerTitulo}>
                        <h1>{idDog[0].name}</h1>
                    </div>
                    <div className={style.containerData}>
                        <p><b>Temperaments: </b>{idDog[0].temperament ? idDog[0].temperament : idDog[0].temperaments.map( e => e.name).toString() }</p>
                        <p><b>Weight: </b>{idDog[0].weight}</p>
                        <p><b>Height: </b>{idDog[0].height}</p>
                        <p><b>Life Span: </b>{idDog[0].life_span}</p>
                    </div>
                </div>
                <div className={style.imageConteiner}>
                    <img src={idDog[0].image}/>
                </div>
            </div> 
            : <p>Error al cargar datos</p>
            }
            <div className={style.buttonToHome}>
                <Link to='/home/'><a>Ir a Home</a></Link>
            </div>
        </div>
    )
}