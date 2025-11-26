import { useQuery } from '@apollo/client';
import { GET_ALL_COMPTES } from '../graphql/queries';

export default function CompteList() {
  const { loading, error, data } = useQuery(GET_ALL_COMPTES, { fetchPolicy: 'network-only' });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur !</p>;

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg p-5">
        <h1 className="text-xl font-semibold mb-4 text-teal-700">Liste des comptes</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.allComptes.map((compte) => (
            <article key={compte.id} className="rounded-lg border bg-white shadow-sm hover:shadow-md transition h-full flex flex-col">
              <div className="p-4 space-y-3 divide-y divide-gray-100">
                {/* Header: ID + Type */}
                <div className="pb-2 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">ID</p>
                    <p className="font-semibold text-slate-800">#{compte.id}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-500">Type</p>
                    <p className="font-medium text-slate-700">{compte.type}</p>
                  </div>
                </div>

                {/* Solde: centered, prominent */}
                <div className="pt-3 pb-2 text-center">
                  <p className="text-xs text-slate-500">Solde</p>
                  <p className="text-2xl font-bold text-teal-700 mt-1">{compte.solde} MAD</p>
                </div>

                {/* Footer area: date or actions */}
                <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                  <span>{compte.dateCreation}</span>
                  <span className="text-right">#</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
