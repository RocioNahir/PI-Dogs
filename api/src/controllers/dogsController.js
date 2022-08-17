const axios = require('axios');
const {Dog, Temperament} = require('../db');
const { YOUR_API_KEY } = process.env;

const getDogsApi = async () => {
    const apiPage = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
    const apiData = await apiPage.data.map( e => {

        return {
            id:e.id,
            name: e.name,
            temperament: e.temperament,
            weight: e.weight.metric,
            height: e.height.metric,
            image: e.image.url,
            life_span: e.life_span,
        };
    });

    return apiData;
}

const getDogsDb = async () => {
    const dogDb = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
    const filterDog = await dogDb.map( e => {
        const arrayTemperaments = e.temperaments.map(e => e.name);
        return {
            id: e.id,
            name: e.name,
            height:e.height,
            weight:e.weight,
            life_span: e.life_span,
            image: e.image,
            my_db: e.my_db,
            temperament: arrayTemperaments.toString()
        }
    })
    return filterDog;
}

async function getAll() {
    try{
        const apiData = await getDogsApi();
        const dbData = await getDogsDb();

        const allData = apiData.concat(dbData);
        return allData;
    } catch(err){
        next(err)
    } 
}


async function getAllDogs(req, res, next) {
    try {
        const { name } = req.query;
        const allDogs = await getAll();
        if(name) {
            let error = "error"
            let dogName = await allDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            if (dogName.length) {
                res.send(dogName);
            } else {
                res.status(400).json({Error: error})
            }
        } else {
            res.send(allDogs);
        }
    } catch(err) {
        res.status(404).json({Error: error.message})
    } 
};



module.exports = {
    getAllDogs,
    getAll,
    getDogsApi
}

