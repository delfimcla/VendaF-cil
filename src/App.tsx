/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import POS from './components/POS';
import Inventory from './components/Inventory';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('pdv');

  const renderContent = () => {
    switch (activeTab) {
      case 'pdv':
        return <POS />;
      case 'estoque':
        return <Inventory />;
      default:
        return (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4">
            <div className="p-8 bg-white rounded-3xl border border-brand-border shadow-sm text-center">
              <h2 className="text-2xl font-bold text-brand-dark mb-2">Em desenvolvimento</h2>
              <p>Esta funcionalidade estará disponível em breve.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-brand-surface font-sans antialiased text-brand-primary">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="ml-20 flex flex-col min-h-screen">
        <header className="h-20 bg-white border-b border-brand-border flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black tracking-tight text-brand-dark flex items-center gap-3">
              {activeTab === 'pdv' ? 'Ponto de Venda' : activeTab === 'estoque' ? 'Gestão de Estoque' : activeTab.toUpperCase()}
              <span className="text-slate-300 text-lg font-medium">#4029</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="h-10 px-4 bg-blue-50 text-brand-accent font-bold flex items-center rounded-xl text-sm border border-blue-100">
              Operador: {new Date().getHours() > 18 ? 'Noite' : 'Dia'}
            </div>
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date().toLocaleDateString('pt-BR', { weekday: 'long' })}</p>
              <p className="text-sm font-black text-brand-dark tracking-tighter">
                {new Date().toLocaleDateString('pt-BR')} — <span className="text-brand-accent">{new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
              </p>
            </div>
          </div>
        </header>

        <section className="flex-1 p-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
