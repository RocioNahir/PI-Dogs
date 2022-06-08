import { CLEAR_DETAIL, CREATE_DOG, FILTER_CREATED, FILTER_TEMP_VALUE, GET_ALL_TEMPERAMENTS, GET_DETAIL_ID, GET_DOGS, GET_NAME_DOG, ORDER_BY_NAME, ORDER_BY_WEIGHT } from "../actions/actions";

const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    detail: [],
}

function reducer(state = initialState, {type, payload}){
    switch(type){
        case GET_DOGS: 
            return {
                ...state,
                dogs: payload,
                allDogs: payload,
            };
        case GET_ALL_TEMPERAMENTS: 
            return {
                ...state, 
                temperaments: payload   
            };
        case GET_NAME_DOG:
            return {
                 ...state,
                 dogs: payload 
            };
        case FILTER_TEMP_VALUE:
            const allDogsArray = state.allDogs;
            const existTemperaments = allDogsArray.filter(u => u.temperament !== undefined);

            const sameTemperament = existTemperaments.filter(t => t.temperament.indexOf(payload.trim()) !== -1 )
            console.log(payload)
            console.log(sameTemperament);

            const statusFiltered = payload === 'Select Temperament...' ? allDogsArray : sameTemperament
            return {
                ...state, 
                dogs: statusFiltered
            };
        case ORDER_BY_NAME:
            const allDogsByName = state.dogs;

            const alfhabetic = payload === 'a-z' ?
            allDogsByName.sort(function(a,b) {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0
            })
            : allDogsByName.sort(function(a,b) {
                if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                return 0;
            })
            
            return {
                ...state,
                dogs: payload === 'By Alfabhetic' ? allDogsByName : alfhabetic
            } 
        case ORDER_BY_WEIGHT: 
            const allDogsByWeight = state.dogs.filter(el => el.weight.indexOf("NaN") === -1);
          
            const arrayByWeight = payload === 'asc' ? 
            allDogsByWeight.sort(function(a,b) {
                const weightA = parseInt(a.weight.split(' - ')[0]);
                const weightB = parseInt(b.weight.split(' - ')[0]);

                if(!isNaN(weightA) && !isNaN(weightB)) {
                    return weightB - weightA;
                }
                return 0;
            })
            : allDogsByWeight.sort(function(a,b) {
                const weightA = parseInt(a.weight.split(' - ')[0]);
                const weightB = parseInt(b.weight.split(' - ')[0]);
    
                if(!isNaN(weightA) && !isNaN(weightB)) {
                    return weightA - weightB;
                }
                return 0;
                    
            })
                console.log(arrayByWeight.map(e => e.weight))
            return {
                ...state,
                dogs: payload === 'By weight' ? state.allDogs : arrayByWeight
            } 

        case CREATE_DOG: return {...state};
        case GET_DETAIL_ID: 
        console.log(payload, 'REDUCEEER')
            return {
                ...state, 
                detail: payload
            }
        case CLEAR_DETAIL:
            return{
                ...state,
                detail: []
            };
        case FILTER_CREATED: 
            const allDogsExist = state.allDogs;
            const createdFilter = payload === 'created' ? allDogsExist.filter( el => el.my_db) : allDogsExist.filter( el => !el.my_db)
            return {
                ...state,
                dogs: payload === 'all' ? state.allDogsExist : createdFilter
            }

        //-----------------
        // case 'DELETE_DOG':
        //     const allDogsDelete = state.allDogs;
        //     const deleteFilter = allDogsDelete.filter(el => el.id !== payload)

        //     return {
        //         ...state,
        //         allDogs: deleteFilter
        //     }


        default: return state;
    }
}


export default reducer;

    //Funciona! En el de Mayor a menor para cuando encuentra un solo numero. En el menor el deja un NaN a lo ultimo con un "NaN-8"
            



            // const allDogsByWeight = state.dogs.filter(el => el.weight !== "NaN");
          
            // const arrayByWeight = payload === 'des' ? 
            // allDogsByWeight.sort(function(a,b) {
            //     // const weightA = parseInt(a.weight.split(' - ')[0]);
            //     // const weightB = parseInt(b.weight.split(' - ')[0]);

            //     // if(weightA > weightA) {
            //     //     return 1
            //     // } else if (weightA < weightB){
            //     //     return -1
            //     // }
            //     // return 0;
                //-------------------
                // if(a.weight.includes('-')){
                //     const weightA = parseInt(a.weight.split(' - ')[0]);
                //     const weightB = parseInt(b.weight.split(' - ')[0]);

                //     if(!isNaN(weightA) && !isNaN(weightB)) {
                //         return weightB - weightA;
                //     } 
                //     return 0
                // } else {
                //     return 1;
                // } 

            //     // //--------------------
            //     if(a.weight.includes('-')){
            //         const weightA = parseInt(a.weight.split(' - ')[1]);
            //         const weightB = parseInt(b.weight.split(' - ')[1]);
            //         const weightBe = parseInt(b.weight)

            //     //     if(weightA && weightB) {
            //     //         return weightB - weightA;
            //     //     } 
            //     //     return 0
            //     // } else {
            //     //     // const weightA = parseInt(a.weight);
            //     //     // const weightB = parseInt(b.weight);

            //     //     // if(!isNaN(weightA) && !isNaN(weightB)) {
            //     //     //     return weightB - weightA;
            //     //     // }
            //     //     return 1;
               
            //         // console.log(weightA);
            //         // console.log(weightB)

            //         if(weightA && !isNaN(weightB)){
            //             if (weightA > weightB){
            //                 return -1;
            //             } else if(weightA < weightB){
            //                 return 1;}
            //                 return 0;
            //         } else if (isNaN(weightB)){
            //             if(weightA > weightBe) {
            //                 return -1;
            //             } else if(weightA < weightBe) {
            //                 return 1;
            //         }
            //         return 0;}
            //     }
            //     })
            //     : allDogsByWeight.sort(function(a,b) {
            //         // const weightA = parseInt(a.weight.split(' - ')[0]);
            //         // const weightB = parseInt(b.weight.split(' - ')[0]);

            //         // return weightB - weightA;
            //         //-------
            //         if(a.weight.includes('-')){
            //             const weightA = parseInt(a.weight.split(' - ')[0]);
            //             const weightB = parseInt(b.weight.split(' - ')[0]);
    
            //             if(weightA && weightB) {
            //                return weightA - weightB;
            //             }
            //             return 0;
            //         } else {
            //             const weightA = parseInt(a.weight);
            //             const weightB = parseInt(b.weight);
                        
            //             if(weightA && weightB) {
            //                 return weightA - weightB;
            //             }
            //             return 0;
            //         }
            //     })
            
            // console.log(arrayByWeight.map(e => e.weight));