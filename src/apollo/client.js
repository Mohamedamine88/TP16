import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, Observable } from "@apollo/client";

const GRAPHQL_URI = process.env.REACT_APP_GRAPHQL_URI || "http://localhost:8082/graphql";

const httpLink = new HttpLink({
  uri: GRAPHQL_URI,
  fetchOptions: { method: "POST" },
});

let nextCompteId = 1000;
let nextTransactionId = 5000;
const comptes = [];
const transactions = [];

function findCompte(id) {
  return comptes.find(c => String(c.id) === String(id));
}

function handleOperation(operation) {
  const name = operation.operationName;
  const vars = operation.variables || {};

  switch (name) {
    case 'GetAllComptes':
      return { data: { allComptes: comptes } };
    case 'GetAllTransactions':
      return { data: { allTransactions: transactions } };
    case 'SaveCompte':
      {
        const input = vars.compte || {};
        const newCompte = {
          id: nextCompteId++,
          solde: input.solde || 0,
          dateCreation: new Date().toLocaleDateString(),
          type: input.type || 'COURANT',
        };
        comptes.push(newCompte);
        return { data: { saveCompte: newCompte } };
      }
    case 'AddTransaction':
      {
        const tr = vars.transactionRequest || {};
        const compte = findCompte(tr.compteId);
        if (!compte) throw new Error('Compte introuvable (mock)');
        const montant = parseFloat(tr.montant) || 0;
        const type = tr.type || 'DEPOT';
        if (type === 'DEPOT') compte.solde = Number(compte.solde) + montant;
        else if (type === 'RETRAIT') compte.solde = Number(compte.solde) - montant;
        const newTransaction = {
          id: nextTransactionId++,
          type,
          montant,
          date: new Date().toLocaleDateString(),
          compte: { id: compte.id, solde: compte.solde, type: compte.type },
        };
        transactions.unshift(newTransaction);
        return { data: { addTransaction: newTransaction } };
      }
    default:
      throw new Error(`Opération GraphQL inconnue dans le fallback mock: ${name}`);
  }
}

const mockLink = new ApolloLink((operation) =>
  new Observable((observer) => {
    const id = setTimeout(() => {
      try {
        const result = handleOperation(operation);
        observer.next(result);
        observer.complete();
      } catch (err) {
        observer.error(err);
      }
    }, 50);
    return () => clearTimeout(id);
  })
);

const fallbackLink = new ApolloLink((operation) =>
  new Observable((observer) => {
    let handled = false;

    const httpObs = httpLink.request(operation);
    const sub = httpObs && httpObs.subscribe({
      next: (result) => {
        handled = true;
        observer.next(result);
      },
      error: (err) => {
        const msg = err && (err.message || (err.networkError && err.networkError.message));
        const isNetwork = msg && msg.toString().toLowerCase().includes('failed to fetch');
        if (isNetwork) {
          console.warn('[apollo-client] Network error, falling back to local mock:', msg);
          const mockObs = mockLink.request(operation);
          if (mockObs) {
            mockObs.subscribe({
              next: (res) => observer.next(res),
              error: (e) => observer.error(e),
              complete: () => observer.complete(),
            });
            return;
          }
        }
        observer.error(err);
      },
      complete: () => observer.complete(),
    });

    return () => {
      if (sub) sub.unsubscribe();
    };
  })
);

export const client = new ApolloClient({
  link: fallbackLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'network-only' },
    query: { fetchPolicy: 'network-only' },
  },
});
