const axios = require('axios');
const { Temperament } = require('../db');

async function allTemperamentApi(req, res, next) {
    try{
        const apiPage = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=de71c9fd-5313-4b17-ac3a-92109a30adbb');
        const apiDataTemp = await apiPage.data.map( elem => elem.temperament); 
 
        const nuevoArray = apiDataTemp.filter(Boolean);
        const nuevoArray1 = nuevoArray.join(', ').trim().split(',').sort();
        const nuevoArray2 = new Set(nuevoArray1);
        let result = [...nuevoArray2]

        result.forEach( temp => {
            Temperament.findOrCreate({
                where: { name: temp }
            })
        });

        const getTemperament = await Temperament.findAll();

        res.status(200).send(getTemperament)
    } catch(err) {
        next(err);
    }
};

module.exports = {
    allTemperamentApi
}