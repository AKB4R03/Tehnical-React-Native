const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/db");

const database = getDatabase();
const collection = database.collection("barang");

const CreateStuff = async (newstuff) => {
  const stuff = await collection.insertOne(newstuff);
  return stuff;
};

const ReadStuff = async () => {
  const stuff = await collection.find().toArray();
  return stuff;
};

const ReadOneStuff = async (transId) => {
  const transaction = await collection.findOne({ _id: new ObjectId(transId) });
  return transaction;
};

const DeleteStuff = async (idstuff) => {
  console.log(idstuff, "----------------------");
  const stuff = await collection.findOneAndDelete({
    _id: new ObjectId(idstuff),
  });
  return stuff;
};

const editStuff = async (newstuff, idStuff) => {
  console.log(newstuff, idStuff, "----------ini------------");
  const stuff = await collection.updateOne(
    { _id: new ObjectId(idStuff) },
    {
      $set: {
        harga: newstuff.harga,
        jumlah: newstuff.jumlah,
        kodeBarang: newstuff.kodeBarang,
        namaBarang: newstuff.namaBarang,
        total: newstuff.harga * newstuff.jumlah,
      },
    }
  );

  return stuff;
};

module.exports = {
  CreateStuff,
  ReadStuff,
  DeleteStuff,
  editStuff,
  ReadOneStuff,
};
