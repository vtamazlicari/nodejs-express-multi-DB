const Sequelize = require('sequelize');

module.exports = mysqlConnector;

function mysqlConnector(uri) {
  return {
    connect,
  }

  async function connect() {
    const sequelize = new Sequelize(uri, {
      dialect: 'mysql',
      logging: false,
      define: {
        freezeTableName: true,
        charset: 'utf8mb4'
      }
    });

    await sequelize.sync();

    return sequelize;
  }
}

