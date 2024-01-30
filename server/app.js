if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoConnection = require("./config/db");
const { responseTypeDefs } = require("./schemas/response");
const { userTypeDefs, userResolvers } = require("./schemas/user");
const { authentication } = require("./utils/authN");
const {
  transactionTypeDefs,
  transactionResolvers,
} = require("./schemas/transaction");
const { stuffResolvers, stuffTypeDefs } = require("./schemas/stuff");

const PORT = 3000;

const server = new ApolloServer({
  typeDefs: [
    stuffTypeDefs,
    transactionTypeDefs,
    userTypeDefs,
    responseTypeDefs,
  ],
  resolvers: [stuffResolvers, transactionResolvers, userResolvers],
});

(async () => {
  try {
    await mongoConnection.connect();
    const { url } = await startStandaloneServer(server, {
      listen: {
        port: PORT,
      },
      context: async ({ req, res }) => {
        return {
          doAuthentication: async () => await authentication(req),
        };
      },
    });
    console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.log(error);
  }
})();
