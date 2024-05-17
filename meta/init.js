var client = require('../cosmos-sdk/db')
var config = require("../cosmos-sdk/config")

const run = async () => {
    const { database } = await client.databases.createIfNotExists({
        id: config.databaseDefName,
      });
      containerCreate(database, config.usersContainer, "/username")
      containerCreate(database, config.setsContainer, "/userId")
}

async function containerCreate(database, containerDef, paths) {
    // Create the container
    const containerDefinition = {
      id: containerDef,
      indexingPolicy: { automatic: true }, // turn on indexes (default)
      // indexingPolicy: { automatic: false }, // turn of indexes
      partitionKey: {
        paths: [paths],
      },
    };
    const { container } = await database.containers.createIfNotExists(
      containerDefinition,
    );
    console.log(`created container: ${container.id}`);
  }

run()