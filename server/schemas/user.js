const { GraphQLError } = require("graphql");
const { UserfindAll, CreateUser, findOneUser } = require("../models/user");
const { hashPw, comparePw, signToken } = require("../utils");

const typeDefs = `#graphql

type User {
    _id: ID
    email: String!
    password: String!
}

input Register {
    email: String!
    password: String!
}

type Query {
    users: ResponseUsers
    login(email: String! password: String!): responseLogin 
}

type Mutation {
    resgister(input:Register): responseCreateUser
}

`;

const resolvers = {
  Query: {
    //? query for get user
    users: async () => {
      try {
        const users = await UserfindAll();
        return {
          statusCode: 200,
          message: "successfully read data user",
          data: users,
        };
      } catch (error) {
        throw new GraphQLError("An error while retrieved data users");
      }
    },
    //? query Login
    login: async (_, { email, password }) => {
      try {
        const user = await findOneUser(email);

        if (!user || !comparePw(password, user.password)) {
          throw { name: "invalid credantials" };
        }

        const payload = {
          email: user.email,
          password: user.password,
        };

        const token = signToken(payload);

        return {
          statusCode: 200,
          message: "successfully login !!!",
          data: { token },
        };
      } catch (error) {
        if (error.name == "invalid credantials") {
          throw new GraphQLError("invalid email or password");
        }
        throw new GraphQLError("An error while login");
      }
    },
  },

  Mutation: {
    //? mutation register
    resgister: async (_, args) => {
      try {
        if (!args.input.email.includes("@")) {
          throw { name: "invalid email" };
        }

        const pw = hashPw(args.input.password);

        const obj = {
          email: args.input.email,
          password: pw,
        };

        await CreateUser(obj);

        return {
          statusCode: 201,
          message: "successfully register",
        };
      } catch (error) {
        if (error.name == "invalid email") {
          throw new GraphQLError("invalid email format");
        }
        throw new GraphQLError("An error while insert data users");
      }
    },
  },
};

module.exports = {
  userTypeDefs: typeDefs,
  userResolvers: resolvers,
};
