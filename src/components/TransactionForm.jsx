import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TRANSACTION } from "../graphql/mutations";
import { GET_ALL_TRANSACTIONS, GET_ALL_COMPTES } from "../graphql/queries";

export default function TransactionForm() {
  const [compteId, setCompteId] = useState("");
  const [montant, setMontant] = useState("");
  const [type, setType] = useState("DEPOT");

  const [status, setStatus] = useState({ loading: false, error: null, success: null });

  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    onCompleted() { setStatus({ loading: false, error: null, success: 'Transaction ajoutée.' }); },
    onError(err) { setStatus({ loading: false, error: err.message || 'Erreur transaction', success: null }); }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setStatus({ loading: true, error: null, success: null });

    addTransaction({
      variables: {
        transactionRequest: {
          compteId: parseInt(compteId),
          montant: parseFloat(montant),
          type,
        },
      },
      refetchQueries: [{ query: GET_ALL_TRANSACTIONS }, { query: GET_ALL_COMPTES }]
    });

    setMontant("");
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <h2 className="font-semibold text-lg mb-3 text-slate-800">Effectuer une transaction</h2>

      {status.error && (
        <div className="mb-3 text-sm text-rose-700 bg-rose-100 p-2 rounded">{status.error}</div>
      )}

      {status.success && (
        <div className="mb-3 text-sm text-emerald-800 bg-emerald-100 p-2 rounded">{status.success}</div>
      )}

      <div className="mb-3">
        <label className="block text-sm font-medium text-slate-700 mb-1">ID compte</label>
        <input
          className="bg-white border border-gray-200 p-3 w-full rounded text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
          placeholder="Ex: 1"
          value={compteId}
          onChange={(e) => setCompteId(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-slate-700 mb-1">Montant</label>
        <input
          className="bg-white border border-gray-200 p-3 w-full rounded text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
          placeholder="Ex: 500"
          type="number"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
        <select
          className="bg-white border border-gray-200 p-3 w-full rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-200"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="DEPOT">Dépôt</option>
          <option value="RETRAIT">Retrait</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded shadow-sm disabled:opacity-60" disabled={status.loading}>
          {status.loading ? 'En cours...' : 'Valider'}
        </button>
      </div>
    </form>
  );
}
