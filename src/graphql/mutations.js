import { gql } from '@apollo/client';

export const SAVE_COMPTE = gql`
mutation SaveCompte($compte: CompteRequest!) {
  saveCompte(compte: $compte) {
    id
    solde
    dateCreation
    type
  }
}
`;

export const DELETE_COMPTE = gql`
mutation DeleteCompte($id: ID!) {
  deleteCompte(id: $id)
}
`;

export const ADD_TRANSACTION = gql`
mutation AddTransaction($transactionRequest: TransactionRequest!) {
  addTransaction(transactionRequest: $transactionRequest) {
    id
    type
    montant
    date
    compte {
      id
      solde
      type
    }
  }
}
`;
