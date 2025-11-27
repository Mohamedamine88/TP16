import { gql } from '@apollo/client';

export const GET_ALL_COMPTES = gql`
query GetAllComptes {
  allComptes {
    id
    solde
    dateCreation
    type
  }
}
`;

export const GET_COMPTE_BY_ID = gql`
query GetCompteById($id: ID!) {
  compteById(id: $id) {
    id
    solde
    dateCreation
    type
  }
}
`;

export const GET_TOTAL_SOLDE = gql`
query GetTotalSolde {
  totalSolde {
    count
    sum
    average
  }
}
`;

export const GET_COMPTE_BY_TYPE = gql`
query GetCompteByType($type: TypeCompte!) {
  findCompteByType(type: $type) {
    id
    solde
    dateCreation
    type
  }
}
`;

export const GET_COMPTE_TRANSACTIONS = gql`
query GetCompteTransactions($id: ID!) {
  compteTransactions(id: $id) {
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

export const GET_ALL_TRANSACTIONS = gql`
query GetAllTransactions {
  allTransactions {
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

export const GET_TRANSACTION_STATS = gql`
query GetTransactionStats {
  transactionStats {
    count
    sumDepots
    sumRetraits
  }
}
`;
