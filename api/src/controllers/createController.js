const {Dog, Temperament} = require('../db');

async function createDog (req, res, next) {
    let { name, heightMin, heightMax , weightMin, weightMax, life_span, temperament} = req.body;
    console.log(req.body, 'req.body')

    if(!name || !heightMin || !heightMax || !weightMin || !weightMax ) return res.status(404).send('Faltan datos obligatorios')
    try {
        let dogCreate = await Dog.create({
            name, 
            height:heightMin + ' - ' + heightMax,
            weight:weightMin + ' - ' + weightMax,
            life_span,
            my_db: true
        })

         let temperamentDataBase = await Temperament.findAll({
             where: { name: temperament }
         })
         dogCreate.addTemperament(temperamentDataBase);

        console.log('comienza aca',dogCreate, 'errrror aca temperamentos')
        res.send('Raza agregada con exito');
    } catch(err) {
        next(err)
    }
};

module.exports = {
    createDog
}