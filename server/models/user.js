const { getDatabase } = require("../config/db");

const database = getDatabase();
const collection = database.collection("users");

const UserfindAll = async () => {
  const users = await collection.find({}).toArray();
  return users;
};

const CreateUser = async (newUser) => {
  const user = await collection.insertOne(newUser);
  return user;
};

const findOneUser = async (email) => {
  const user = await collection.findOne({ email: email });

  return user;
};

module.exports = {
  UserfindAll,
  CreateUser,
  findOneUser,
};
