const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('autenticacion', 'igna', '123456', {
    host: 'localhost',
    dialect: 'mariadb'
});


const User = sequelize.define('User', {
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  password: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

const Provider = sequelize.define('Providers', {
  // Model attributes are defined here
  strategy_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  strategy_id: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

(async () => {
    User.hasMany(Provider)
    await sequelize.sync({ force: true });
    const all = await User.findAll()
    console.log(all);
    // Code here
  })();


 function getCon() {
    return sequelize
 }

module.exports = {
  getCon
}