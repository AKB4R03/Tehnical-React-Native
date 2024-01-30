const { GraphQLError } = require("graphql");
const {
  ReadStuff,
  CreateStuff,
  editStuff,
  DeleteStuff,
  ReadOneStuff,
} = require("../models/stuff");

const typeDefs = `#graphql



input Stuff {
    kodeBarang: String! 
    namaBarang: String!
    harga: Int!
    jumlah: Int!
}



type stuff {
    _id: ID!
    kodeBarang: String! 
    namaBarang: String!
    harga: Int!
    jumlah: Int!
    total: Int!
}

type Query {
    readStuff: responseReadStuff
    deleteStuff(stuffId: ID): responseDeleteTransacaction
    readOneStuff(stuffId: ID): responseReadOneStuff
}

type Mutation {
    stuff(input:Stuff): responseCreateTransaction
    editStuff(input:Stuff stuffId: ID): responseCreateTransaction
}


`;

const resolvers = {
  Query: {
    readStuff: async (_, __, context) => {
      try {
        const { email: userEmail } = await context.doAuthentication();

        // console.log(halo, "=========ini email=======");

        if (!userEmail) throw new GraphQLError("You are not authenticated");

        const readStuff = await ReadStuff();

        return {
          statusCode: 200,
          message: "Successfully Read Data Stuff",
          data: readStuff,
        };
      } catch (error) {
        throw new GraphQLError("An error while read data Stuff");
      }
    },

    deleteStuff: async (_, args, context) => {
      try {
        const { email: userEmail } = await context.doAuthentication();

        // console.log(halo, "=========ini email=======");

        if (!userEmail) throw new GraphQLError("You are not authenticated");

        // console.log(args.stuffId, "===============");

        await DeleteStuff(args.stuffId);

        // console.log(result, "============");
        return {
          statusCode: 202,
          message: "sucessfully delete data stuff",
        };
      } catch (error) {
        throw new GraphQLError("An error while delete data stuff");
      }
    },

    readOneStuff: async (_, args, context) => {
      try {
        const { email: userEmail } = await context.doAuthentication();

        // console.log(halo, "=========ini email=======");

        if (!userEmail) throw new GraphQLError("You are not authenticated");

        // console.log(readStuff, "----------------");
        const readStuff = await ReadOneStuff(args.stuffId);

        return {
          statusCode: 200,
          message: "Successfully Read Data Transaction",
          data: readStuff,
        };
      } catch (error) {
        throw new GraphQLError("An error while read data transaction");
      }
    },
  },

  Mutation: {
    stuff: async (_, args, context) => {
      try {
        const { email: userEmail } = await context.doAuthentication();

        // console.log(halo, "=========ini email=======");
        // console.log(args, "................");

        if (!userEmail) throw new GraphQLError("You are not authenticated");

        const data = {
          kodeBarang: args.input.kodeBarang,
          namaBarang: args.input.namaBarang,
          harga: args.input.harga,
          jumlah: args.input.jumlah,
          total: args.input.harga * args.input.jumlah,
        };

        const result = await CreateStuff(data);

        return {
          statusCode: 201,
          message: "successfully input data stuff",
        };
      } catch (error) {
        console.error(error);
        throw new GraphQLError("An Error While Input stuff");
      }
    },
    editStuff: async (_, args, context) => {
      try {
        const { email: userEmail } = await context.doAuthentication();

        // console.log(halo, "=========ini email=======");

        if (!userEmail) throw new GraphQLError("You are not authenticated");

        const result = await editStuff(args.input, args.stuffId);

        // console.log(result, "+++++++++++++++++");

        return {
          statusCode: 201,
          message: "successfully edit data stuff",
        };
      } catch (error) {
        throw new GraphQLError("An Error While Edit stuff");
      }
    },
  },
};

module.exports = {
  stuffTypeDefs: typeDefs,
  stuffResolvers: resolvers,
};
