import { useMutation } from '@apollo/client';
import { SAVE_COMPTE } from '../graphql/mutations';
import { GET_ALL_COMPTES } from '../graphql/queries';
import { useState } from 'react';

export default function CreateCompte() {
  const [solde, setSolde] = useState('');
  const [type, setType] = useState('COURANT');
  const [status, setStatus] = useState({ loading: false, error: null, success: null });

  const [saveCompte] = useMutation(SAVE_COMPTE, {
    onCompleted(data) {
      setStatus({ loading: false, error: null, success: 'Compte créé avec succès.' });
    },
    onError(error) {
      setStatus({ loading: false, error: error.message || 'Erreur lors de la création.', success: null });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setStatus({ loading: true, error: null, success: null });

    saveCompte({
      variables: {
        compte: { solde: parseFloat(solde), type }
      },
      refetchQueries: [{ query: GET_ALL_COMPTES }]
    });

    setSolde('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <h2 className="text-lg font-semibold mb-3 text-slate-800">Créer un compte</h2>

      {status.error && (
        <div className="mb-3 text-sm text-rose-700 bg-rose-100 p-2 rounded">{status.error}</div>
      )}

      {status.success && (
        <div className="mb-3 text-sm text-emerald-800 bg-emerald-100 p-2 rounded">{status.success}</div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">Solde</label>
        <input
          type="number"
          placeholder="Ex: 1500"
          className="bg-white border border-gray-200 p-3 w-full rounded text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
          value={solde}
          onChange={(e) => setSolde(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">Type de compte</label>
        <select
          className="bg-white border border-gray-200 p-3 w-full rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-200"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="COURANT">Courant</option>
          <option value="EPARGNE">Épargne</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded shadow-sm disabled:opacity-60" disabled={status.loading}>
          {status.loading ? 'En cours...' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
}
