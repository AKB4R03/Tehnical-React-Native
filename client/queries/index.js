import { gql } from "@apollo/client";

export const DO_LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      statusCode
      message
      error
      data {
        token
      }
    }
  }
`;

export const GET_TRANSACTION = gql`
  query ReadTransaction {
    readTransaction {
      statusCode
      message
      error
      data {
        nomor
        tanggal
        kode
        nama
        noTelp
        _id
      }
    }
  }
`;

export const DO_DELETE = gql`
  query DeleteTransaction($transactionId: ID) {
    deleteTransaction(transactionId: $transactionId) {
      error
      message
      statusCode
    }
  }
`;

export const DO_ADD_TRANSACTION = gql`
  mutation Mutation($input: Transaction) {
    transaction(input: $input) {
      statusCode
      message
      error
    }
  }
`;

export const GET_ONE_TRANSACTION = gql`
  query ReadOneTransaction($transactionId: ID) {
    readOneTransaction(transactionId: $transactionId) {
      data {
        _id
        nomor
        tanggal
        kode
        nama
        noTelp
      }
      error
      message
      statusCode
    }
  }
`;

export const DO_EDIT_TRANSACTION = gql`
  mutation Mutation($input: Transaction, $transactionId: ID) {
    editTransaction(input: $input, transactionId: $transactionId) {
      error
      message
      statusCode
    }
  }
`;

export const GET_STUFF = gql`
  query Query {
    readStuff {
      statusCode
      message
      error
      data {
        _id
        kodeBarang
        namaBarang
        harga
        jumlah
        total
      }
    }
  }
`;

export const DO_DELETE_STUFF = gql`
  query Query($stuffId: ID) {
    deleteStuff(stuffId: $stuffId) {
      error
      message
      statusCode
    }
  }
`;

export const DO_ADD_STUFF = gql`
  mutation Mutation($input: Stuff) {
    stuff(input: $input) {
      error
      message
      statusCode
    }
  }
`;

export const DO_EDIT_STUFF = gql`
  mutation Mutation($input: Stuff, $stuffId: ID) {
    editStuff(input: $input, stuffId: $stuffId) {
      statusCode
      message
      error
    }
  }
`;

export const GET_ONE_STUFF = gql`
  query ReadOneStuff($stuffId: ID) {
    readOneStuff(stuffId: $stuffId) {
      statusCode
      message
      error
      data {
        _id
        kodeBarang
        namaBarang
        harga
        jumlah
        total
      }
    }
  }
`;
