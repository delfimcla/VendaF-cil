import React from 'react';
import { ShoppingCart, Package, History, BarChart3, Settings, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const menuItems = [
    { id: 'pdv', label: 'PDV', icon: ShoppingCart },
    { id: 'estoque', label: 'Estoque', icon: Package },
    { id: 'historico', label: 'Histórico', icon: History },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
    { id: 'config', label: 'Config.', icon: Settings },
  ];

  return (
    <aside className="w-20 h-screen bg-brand-dark text-white flex flex-col items-center py-8 fixed left-0 top-0 z-50">
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-10 shadow-lg shadow-white/10">
        <div className="w-5 h-5 bg-brand-dark rotate-45" />
      </div>

      <nav className="flex-1 flex flex-col space-y-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            title={item.label}
            className={`p-3 rounded-xl transition-all duration-300 relative group ${
              activeTab === item.id
                ? 'bg-brand-primary text-white scale-110 shadow-md'
                : 'text-slate-500 hover:text-white hover:bg-slate-800'
            }`}
          >
            <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            {activeTab === item.id && (
              <motion.div
                layoutId="active-nav"
                className="absolute left-full ml-4 bg-brand-dark text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest hidden group-hover:block whitespace-nowrap z-50"
              >
                {item.label}
              </motion.div>
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <button className="w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-400 hover:bg-red-500/20 hover:text-red-500 transition-all cursor-pointer">
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
