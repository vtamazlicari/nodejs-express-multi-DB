const config = require('config');
const connectorFactory = require('./src/connectors/connector.factory');

connectorFactory()
  .connect()
  .then(startServer)
  .catch(handleError)

function startServer(connection) {
  const app = require('./src/app')(connection);

  app.listen(config.port, () => {
    console.log(`Server is working on http://localhost:${config.port}`);
  });
}

function handleError(error) {
  console.error(error);
}



