import { useQuery } from "@apollo/client";
import { GET_ALL_TRANSACTIONS } from "../graphql/queries";

export default function TransactionList() {
  const { loading, error, data } = useQuery(GET_ALL_TRANSACTIONS, { fetchPolicy: 'network-only' });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement...</p>;

  return (
    <div className="p-4">
      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="font-semibold text-xl mb-4 text-teal-700">Historique des transactions</h2>

        <div className="grid grid-cols-1 gap-4">
          {data.allTransactions.map((t) => (
            <div key={t.id} className="rounded-lg border bg-white shadow-sm hover:shadow transition p-4 flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-500">Montant</p>
                <p className="font-medium text-slate-800">{t.montant} MAD</p>
                <p className="text-xs text-slate-500 mt-1">Compte #{t.compte.id}</p>
              </div>

              <div className="text-right">
                <p className="text-xs text-slate-500">{t.date}</p>
                <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${t.type === 'RETRAIT' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                  {t.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
