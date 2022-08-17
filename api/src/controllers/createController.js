const {Dog, Temperament} = require('../db');

async function createDog (req, res, next) {
    let { name, heightMin, heightMax , weightMin, weightMax, life_span, image, temperament} = req.body;

    if(!name || !heightMin || !heightMax || !weightMin || !weightMax ) return res.status(404).send('Faltan datos obligatorios')
    try {
        let dogCreate = await Dog.create({
            name, 
            height:heightMin + ' - ' + heightMax,
            weight:weightMin + ' - ' + weightMax,
            life_span,
            image,
            my_db: true
        })

        let temperamentDataBase = await Temperament.findAll({
            where: { name: temperament }
        })
        dogCreate.addTemperament(temperamentDataBase);

        res.send('Raza agregada con exito');
    } catch(err) {
        next(err)
    }
};

module.exports = {
    createDog
}