const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/db");

const database = getDatabase();
const collection = database.collection("transaksi");

const CreateTransaction = async (newTransaction) => {
  const transaction = await collection.insertOne(newTransaction);
  return transaction;
};

const ReadTransaction = async () => {
  const transaction = await collection.find().toArray();
  return transaction;
};

const ReadOneTransaction = async (transId) => {
  const transaction = await collection.findOne({ _id: new ObjectId(transId) });
  return transaction;
};

const DeleteTransaction = async (idTransaction) => {
  console.log(idTransaction, "----------------------");
  const transaction = await collection.findOneAndDelete({
    _id: new ObjectId(idTransaction),
  });
  return transaction;
};

const editTransaction = async (newTransaction, transId) => {
  const transaction = await collection.updateOne(
    { _id: new ObjectId(transId) },
    {
      $set: {
        nomor: newTransaction.nomor,
        tanggal: newTransaction.tanggal,
        kode: newTransaction.kode,
        nama: newTransaction.nama,
        noTelp: newTransaction.noTelp,
      },
    }
  );

  return transaction;
};

module.exports = {
  CreateTransaction,
  ReadTransaction,
  DeleteTransaction,
  editTransaction,
  ReadOneTransaction,
};
