import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { DollarSign, Search, Filter, Download, ArrowUpRight, CreditCard, TrendingUp } from 'lucide-react';


import { financeService } from '../../services/financeService';
import toast, { Toaster } from 'react-hot-toast'; // Ensure Toaster is rendered
import { useEffect, useState } from 'react'; // Add imports

const Finance: React.FC = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTransactions();
        const sub = financeService.subscribeToTransactions(() => loadTransactions());
        return () => { sub.unsubscribe(); };
    }, []);

    const loadTransactions = async () => {
        try {
            const data = await financeService.getTransactions();
            setTransactions(data || []);
        } catch (error) {
            console.error(error);
            toast.error('Erro ao carregar financeiro');
        } finally {
            setLoading(false);
        }
    };


    return (
        <AdminLayout>
            <Toaster position="top-right" />
            <div className="space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 mb-2">
                            Financeiro
                        </h1>
                        <p className="text-gray-400">Controle de faturamento e pagamentos dos leads.</p>
                    </div>
                    <button className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-6 py-3 flex items-center space-x-2 text-white transition-all">
                        <Download size={18} />
                        <span className="font-bold">Exportar CSV</span>
                    </button>
                </div>

                {/* Resumo Financeiro */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-xl bg-green-500/20 text-green-400">
                                <DollarSign size={24} />
                            </div>
                            <span className="flex items-center text-xs font-bold text-green-400">
                                +15% <ArrowUpRight size={14} />
                            </span>
                        </div>
                        <p className="text-sm text-gray-400">Receita Total (Mês)</p>
                        <h3 className="text-3xl font-bold text-white mt-1">R$ 12.450,00</h3>
                    </div>

                    <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
                                <CreditCard size={24} />
                            </div>
                            <span className="flex items-center text-xs font-bold text-amber-400">
                                4 itens
                            </span>
                        </div>
                        <p className="text-sm text-gray-400">Pendentes</p>
                        <h3 className="text-3xl font-bold text-white mt-1">R$ 1.850,00</h3>
                    </div>

                    <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
                                <TrendingUp size={24} />
                            </div>
                        </div>
                        <p className="text-sm text-gray-400">Markup de Conversão</p>
                        <h3 className="text-3xl font-bold text-white mt-1">24%</h3>
                    </div>
                </div>

                {/* Tabela de Transações */}
                <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                    <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative flex-grow max-w-md">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Buscar cliente ou transação..."
                                className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all">
                                <Filter size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/[0.02] text-gray-400 text-xs uppercase tracking-widest font-bold">
                                <tr>
                                    <th className="px-6 py-4">Cliente</th>
                                    <th className="px-6 py-4">Data</th>
                                    <th className="px-6 py-4">Método</th>
                                    <th className="px-6 py-4">Valor</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                            Carregando transações...
                                        </td>
                                    </tr>
                                ) : transactions.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                            Nenhuma transação encontrada.
                                        </td>
                                    </tr>
                                ) : (
                                    transactions.map((t) => (
                                        <tr key={t.id} className="hover:bg-white/[0.02] transition-all group">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-white group-hover:text-amber-400 transition-colors">{t.customer}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-400">{t.date}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300">
                                                    {t.method}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-white">R$ {t.amount.toFixed(2)}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${t.status === 'pago'
                                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                                    }`}>
                                                    {t.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Finance;
