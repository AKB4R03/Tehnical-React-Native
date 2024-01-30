const responseTypeDefs = `#graphql

interface Response {
    statusCode: Int!
    message: String
    error: String
  }

  type access_token  {
    token: String
  }

  type ResponseUsers implements Response {
    statusCode: Int!
    message: String
    error: String
    data: [User]
  }

  type responseCreateUser implements Response {
  statusCode: Int!
  message: String
  error: String
  }

  type responseLogin implements Response {
  statusCode: Int!
  message: String
  error: String
  data: access_token
  }

  type responseCreateTransaction implements Response {
  statusCode: Int!
  message: String
  error: String
  }

  type responseDeleteTransacaction implements Response {
  statusCode: Int!
  message: String
  error: String
  }

  type responseReadTransaction implements Response {
  statusCode: Int!
  message: String
  error: String
  data: [transaction]
  }

  type responseReadOneTransacaction implements Response {
  statusCode: Int!
  message: String
  error: String
  data: transaction
  }

  type responseReadOneStuff implements Response {
  statusCode: Int!
  message: String
  error: String
  data: stuff
  }

  type responseReadStuff implements Response {
  statusCode: Int!
  message: String
  error: String
  data: [stuff]
  }

`;

module.exports = {
  responseTypeDefs,
};
