const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('character', {
    id: {
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    status:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    species:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    image:{
      type: DataTypes.STRING,
    },
    
    location:{
     type:DataTypes.STRING,
    },
    created:{
      type:DataTypes.STRING,
    },
    type:{
      type:DataTypes.STRING,
    },
    origin:{
      type:DataTypes.STRING,
    }
  });
  
};