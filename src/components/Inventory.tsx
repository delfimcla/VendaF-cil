import React, { useState } from 'react';
import { Search, Package, AlertTriangle, ChevronRight, Filter } from 'lucide-react';
import { Product, INITIAL_PRODUCTS } from '../types';

const Inventory = () => {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: products.length,
    inStock: products.reduce((acc, p) => acc + p.stock, 0),
    lowStock: products.filter(p => p.stock < 10).length
  };

  return (
    <div className="space-y-8">
      {/* Header & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-brand-border shadow-sm flex items-center gap-6 group hover:border-brand-accent transition-all">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all">
            <Package size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Geral</p>
            <p className="text-3xl font-black text-brand-dark font-mono tracking-tighter">{stats.total}</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-brand-border shadow-sm flex items-center gap-6 group hover:border-green-500 transition-all">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
            <ChevronRight size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Unidades</p>
            <p className="text-3xl font-black text-brand-dark font-mono tracking-tighter">{stats.inStock}</p>
          </div>
        </div>

        <div className="bg-red-50 p-8 rounded-[32px] border border-red-100 shadow-sm flex items-center gap-6 group hover:border-red-500 transition-all">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
            <AlertTriangle size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em]">Faltando</p>
            <p className="text-3xl font-black text-red-700 font-mono tracking-tighter">{stats.lowStock}</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[24px] border border-brand-border shadow-sm">
        <div className="w-full md:max-w-md bg-slate-50 p-2 rounded-xl border border-slate-100 flex items-center gap-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-accent/10 transition-all">
          <Search className="text-slate-400 ml-2" size={18} />
          <input
            type="text"
            placeholder="Pesquisar por nome ou código..."
            className="flex-1 bg-transparent py-2 text-sm font-bold focus:outline-none placeholder:text-slate-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-500 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
            Filtrar
          </button>
          <button className="px-6 py-3 bg-brand-dark text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-brand-dark/10">
            Adicionar Novo
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[32px] border border-brand-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Cód.</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Produto</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Categoria</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Preço</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Qtd.</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6 font-mono text-xs text-brand-accent font-bold">#{product.code}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-white group-hover:shadow-sm transition-all">
                        <Package size={18} />
                      </div>
                      <span className="font-black text-brand-dark text-sm tracking-tight">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">{product.category}</span>
                  </td>
                  <td className="px-8 py-6 font-black text-brand-dark font-mono tracking-tighter">R$ {product.price.toFixed(2)}</td>
                  <td className="px-8 py-6 text-center">
                    <span className={`text-sm font-black font-mono ${product.stock < 10 ? 'text-red-500 bg-red-50 px-2 py-1 rounded-lg' : 'text-slate-700'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    {product.stock < 10 ? (
                      <span className="inline-flex items-center gap-2 text-[10px] font-black text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100 uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                        Crítico
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-[10px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100 uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                        Ok
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
