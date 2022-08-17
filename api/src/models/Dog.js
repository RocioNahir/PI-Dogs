const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    height: {
      type: DataTypes.STRING,
      
    },

    weight: {
      type: DataTypes.STRING,
      
    },


    life_span: {
      type: DataTypes.STRING,
      
    },

    image: {
      type: DataTypes.STRING,
    },

    my_db: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

};
