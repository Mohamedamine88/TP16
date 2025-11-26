import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/client";

import CompteList from "./components/CompteList";
import CreateCompte from "./components/CreateCompte";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="max-w-6xl mx-auto space-y-6">
          <header className="p-4 rounded-lg bg-white shadow-sm">
            <h1 className="text-3xl font-extrabold text-teal-700">Gestion des Comptes Bancaires</h1>
          </header>

          {/* ACTIONS - full width */}
          <section className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded">
                <CreateCompte />
              </div>
              <div className="p-3 bg-slate-50 rounded">
                <TransactionForm />
              </div>
            </div>
          </section>

          {/* LISTS - below actions */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <CompteList />
            </div>
            <div>
              <TransactionList />
            </div>
          </section>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
