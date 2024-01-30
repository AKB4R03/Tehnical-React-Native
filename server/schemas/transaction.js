const { GraphQLError } = require("graphql");
const {
  CreateTransaction,
  ReadTransaction,
  DeleteTransaction,
  editTransaction,
  ReadOneTransaction,
} = require("../models/transaction");

const typeDefs = `#graphql



input Transaction {
    nomor: String!
    tanggal: String!
    kode: String!
    nama: String!
    noTelp: String!
}

type transaction {
    _id: ID
    nomor: String!
    tanggal: String!
    kode: String!
    nama: String!
    noTelp: String!
}

type Query {
    readTransaction: responseReadTransaction
    deleteTransaction(transactionId: ID): responseDeleteTransacaction
    readOneTransaction(transactionId: ID): responseReadOneTransacaction
}

type Mutation {
    transaction(input:Transaction): responseCreateTransaction
    editTransaction(input:Transaction transactionId: ID): responseCreateTransaction
}


`;

const resolvers = {
  Query: {
    readTransaction: async (_, __, context) => {
      try {
        const { email: userEmail } = await context.doAuthentication();

        // console.log(halo, "=========ini email=======");

        if (!userEmail) throw new GraphQLError("You are not authenticated");

        const readTransaction = await ReadTransaction();

        return {
          statusCode: 200,
          message: "Successfully Read Data Transaction",
          data: readTransaction,
        };
      } catch (error) {
        throw new GraphQLError("An error while read data transaction");
      }
    },

    deleteTransaction: async (_, args, context) => {
      try {
        const { email: userEmail } = await context.doAuthentication();

        // console.log(halo, "=========ini email=======");

        if (!userEmail) throw new GraphQLError("You are not authenticated");

        // console.log(args.transactionId, "===============");

        await DeleteTransaction(args.transactionId);

        // console.log(result, "============");
        return {
          statusCode: 202,
          message: "sucessfully delete data transaction",
        };
      } catch (error) {
        throw new GraphQLError("An error while delete data transaction");
      }
    },

    readOneTransaction: async (_, args, context) => {
      try {
        const { email: userEmail } = await context.doAuthentication();

        // console.log(halo, "=========ini email=======");

        if (!userEmail) throw new GraphQLError("You are not authenticated");

        const readTransaction = await ReadOneTransaction(args.transactionId);

        return {
          statusCode: 200,
          message: "Successfully Read Data Transaction",
          data: readTransaction,
        };
      } catch (error) {
        throw new GraphQLError("An error while read data transaction");
      }
    },
  },

  Mutation: {
    transaction: async (_, args, context) => {
      try {
        const { email: userEmail } = await context.doAuthentication();

        // console.log(halo, "=========ini email=======");
        // console.log(args, "................");

        if (!userEmail) throw new GraphQLError("You are not authenticated");

        const { nomor, tanggal, kode, nama, noTelp } = args.input;

        const data = {
          nomor: nomor,
          tanggal: tanggal,
          kode: kode,
          nama: nama,
          noTelp: noTelp,
          email: userEmail,
        };

        const result = await CreateTransaction(data);

        return {
          statusCode: 201,
          message: "successfully input data transaction",
        };
      } catch (error) {
        console.error(error);
        throw new GraphQLError("An Error While Input Transaction");
      }
    },
    editTransaction: async (_, args, context) => {
      try {
        const { email: userEmail } = await context.doAuthentication();

        // console.log(halo, "=========ini email=======");

        if (!userEmail) throw new GraphQLError("You are not authenticated");

        const result = await editTransaction(args.input, args.transactionId);

        // console.log(result, "+++++++++++++++++");

        return {
          statusCode: 201,
          message: "successfully edit data transaction",
        };
      } catch (error) {
        throw new GraphQLError("An Error While Edit Transaction");
      }
    },
  },
};

module.exports = {
  transactionTypeDefs: typeDefs,
  transactionResolvers: resolvers,
};
