const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.MONGODB_CONN_STRING;

const client = new MongoClient(uri);
const dbName = process.env.MONGODB_DB_NAME;

//* nama pola pemrograman ini singleThunk, hanya terjadi connection 1 kali saja theoritical

async function connect() {
  try {
    await client.connect();
    console.log("Successfully to connect mongodb");
    return client;
  } catch (error) {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

function getDatabase() {
  return client.db(dbName);
}

module.exports = {
  connect,
  getDatabase,
};
