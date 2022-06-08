import axios from 'axios';

export const GET_DOGS = 'GET_DOGS';
export const GET_ALL_TEMPERAMENTS = 'GET_ALL_TEMPERAMENTS';
export const GET_NAME_DOG = 'GET_NAME_DOG';
export const FILTER_TEMP_VALUE = 'FILTER_TEMP_VALUE';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT';
export const GET_DETAIL_ID = 'GET_DETAIL_ID';
export const FILTER_CREATED = 'FILTER_CREATED';
export const CREATE_DOG = 'CREATE_DOG';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';


export function getAllDogs(){
    return async function(dispatch) {
        let dogs = await axios.get("http://localhost:3001/dogs");
        return dispatch({
            type: GET_DOGS,
            payload: dogs.data
        })
    }
}

export function getAllTemperament(){
    return async function(dispatch){
        let temperaments = await axios.get("http://localhost:3001/temperament");
        return dispatch({
            type: GET_ALL_TEMPERAMENTS,
            payload: temperaments.data
        })
    }
}

export function getNameDog(payload){
    return async function(dispatch){
        let name = await axios.get(`http://localhost:3001/dogs?name=${payload}`)
        return dispatch({
            type: GET_NAME_DOG,
            payload: name.data
        })
    }
}

export function filterTemperaments(payload){
    return {
        type: FILTER_TEMP_VALUE,
        payload
    }
}

export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByWeight(payload){
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
}

export function getDetailId(id){
    return async function(dispatch){
        let getId = await axios.get(`http://localhost:3001/dogs/${id}`)
        return dispatch({
            type: GET_DETAIL_ID,
            payload: getId.data
        })
    }
}

export function filterCreated(payload){
    return {
        type: FILTER_CREATED,
        payload
    }
}

export function createDog(payload){
    return async function(dispatch){
        try {
            let create = await axios.post("http://localhost:3001/dog", payload);
            return dispatch({
                type: CREATE_DOG,
                payload: create
            })
        } catch(err){
            console.log(err.response);
        }
    }
}

export function clearDetail(payload){
    return {
    type: CLEAR_DETAIL,
    payload
    }
}
