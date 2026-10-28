const mongoose = require('mongoose');

module.exports = mongoConnector;

function mongoConnector(uri) {
  return {
    connect,
  }

  async function connect() {
    return await mongoose.connect(uri)
  }
}

