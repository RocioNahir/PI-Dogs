const { Dog, Temperament } = require('../db');
const { getDogsApi, getAll } = require('./dogsController');

async function getIdDogs (req, res, next) {
    const id = req.params.id;
    const allDogsApi = await getDogsApi();

    try{
        if(id){
            if(id.includes('-')) {
                const dogDetailDb1 = await Dog.findByPk(id,{  
                    include: {
                        model: Temperament,
                        attributes: ['name'],
                        through: {
                            attributes: [],
                        }
                    }
                })
                const dogDetailDb = [];
                dogDetailDb.push(dogDetailDb1);

                if(dogDetailDb) {
                    return res.json(dogDetailDb)
                };
                res.status(404).send('No encontrado')

            } else {
                const apiDetail = await allDogsApi.filter(e => e.id.toString() === id);
                if(apiDetail) {
                    return res.json(apiDetail)
                };
                res.status(404).send('No encontrado')
        }}
        res.status(404).send(':c')
    } catch(err){ 
        next(err);
    }
}

module.exports = {
    getIdDogs
}