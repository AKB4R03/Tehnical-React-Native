const { GraphQLError } = require("graphql");
const { verifyToken } = require("./index");
const { findOneUser } = require("../models/user");

const authentication = async (req) => {
  //   console.log(req, "=================00");
  const headerAuthorization = req.headers.authorization;

  if (!headerAuthorization) {
    throw new GraphQLError("you Are Not Authenticated", {
      extensions: {
        http: "401",
        code: "UNAUTHENTICATED",
      },
    });
  }

  const token = headerAuthorization.split(" ")[1];

  const payload = verifyToken(token);

  const user = await findOneUser(payload.email);

  if (!user) {
    throw new GraphQLError(
      "you Are Not Authenticated, Something Wrong Your access_token",
      {
        extensions: {
          http: 401,
          code: "UNAUTHENTICATED",
        },
      }
    );
  }

  //   console.log(user, "------------------------");
  return {
    id: user._id,
    email: user.email,
  };
};

module.exports = {
  authentication,
};
