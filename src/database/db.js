const { Sequelize, DataTypes, Model }  = require('sequelize');

var config = {
  "define": {
      "createdAt": "createdat",
      "updatedAt": "updatedat"
    } /*don't forget to add host, port, dialect, etc.*/
  }
const sequelize = new Sequelize('galaxycard', 'postgres', '1999', {
    host: '127.0.0.1',
    port:'5433',
    dialect: 'postgres',
    define: {
      "createdAt": "createdat",
      "updatedAt": "updatedat"
    }
  });

  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('---------------Unable to connect to the database:=-------------', error);
  }
//Models
const User = sequelize.define('users', {
    // Model attributes are defined here
    ID: DataTypes.UUID,
    username: DataTypes.STRING,
    lastName: DataTypes.STRING,
    Email: DataTypes.STRING
});

module.exports = sequelize;
global.sequelize = sequelize;
