import React, { useState, useMemo } from 'react';
import { Search, Plus, Minus, Trash2, CheckCircle2, X, Package, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem, PaymentMethod, INITIAL_PRODUCTS } from '../types';

const POS = () => {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, products]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const clearCart = () => setCart([]);

  const handleFinishVenda = () => {
    if (cart.length === 0) return;
    setIsCheckoutOpen(true);
  };

  const confirmSale = () => {
    alert(`Venda realizada com sucesso via ${paymentMethod}!`);
    setCart([]);
    setIsCheckoutOpen(false);
    setPaymentMethod(null);
  };

  return (
    <div className="flex h-full gap-0 -m-6">
      {/* Product Grid Section (60%) */}
      <section className="w-[60%] p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black text-brand-dark flex items-center gap-2">
            <Package className="text-brand-accent" size={20} />
            Estoque Ativo
          </h2>
          <div className="flex bg-white border border-brand-border rounded-full p-1 shadow-sm">
            <button className="px-5 py-1.5 bg-brand-dark text-white rounded-full text-xs font-bold transition-all">Todos</button>
            <button className="px-5 py-1.5 text-slate-500 hover:bg-slate-50 rounded-full text-xs font-bold transition-all">Bebidas</button>
            <button className="px-5 py-1.5 text-slate-500 hover:bg-slate-50 rounded-full text-xs font-bold transition-all">Salgados</button>
          </div>
        </div>

        <div className="mb-8 bg-white/50 border border-brand-border rounded-2xl p-2 flex items-center gap-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-accent/20 transition-all">
          <div className="p-2 text-slate-400"><Search size={18} /></div>
          <input
            type="text"
            placeholder="Pesquisar produtos ou código..."
            className="flex-1 bg-transparent py-2 text-sm font-medium focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              onClick={() => addToCart(product)}
              className="bg-white p-5 rounded-3xl border border-brand-border shadow-sm flex flex-col items-center text-center cursor-pointer hover:border-brand-accent hover:shadow-xl hover:shadow-brand-accent/5 transition-all group active:scale-95"
            >
              <div className="w-full h-36 bg-slate-50 rounded-2xl mb-4 flex flex-col items-center justify-center font-bold text-slate-200 uppercase tracking-widest relative overflow-hidden group-hover:bg-blue-50 transition-colors">
                <Package size={48} className="opacity-20 group-hover:opacity-100 group-hover:text-brand-accent transition-all group-hover:scale-110" />
                <span className="mt-2 text-[10px] text-slate-400 group-hover:text-brand-accent">{product.code}</span>
              </div>
              <span className="text-sm font-black text-brand-dark leading-tight">{product.name}</span>
              <span className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-wider">Estoque: {product.stock} un</span>
              <span className="text-xl font-black text-brand-accent font-mono tracking-tighter">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </motion.div>
          ))}
          <div className="bg-white/30 p-5 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center cursor-pointer hover:border-brand-accent group transition-all">
             <Plus size={24} className="text-slate-300 group-hover:text-brand-accent mb-2" />
             <span className="text-xs font-bold text-slate-400 group-hover:text-brand-accent uppercase tracking-widest">Novo Produto</span>
          </div>
        </div>
      </section>

      {/* Cart Section (40%) */}
      <section className="w-[40%] bg-white border-l border-brand-border flex flex-col relative shadow-2xl shadow-brand-dark/5">
        <div className="p-8 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-brand-dark tracking-tight">Carrinho</h2>
            <button 
              onClick={clearCart}
              className="text-[10px] text-red-500 font-black uppercase tracking-widest hover:bg-red-50 px-3 py-1 rounded-full transition-colors"
            >
              Limpar Tudo
            </button>
          </div>

          {/* CART ITEMS */}
          <div className="flex-1 space-y-4 overflow-y-auto pr-1 mb-8">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-10">
                <ShoppingCart size={80} />
                <p className="font-black uppercase tracking-widest mt-4">Vazio</p>
              </div>
            ) : (
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    key={item.id}
                    className="flex items-center space-x-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-brand-accent/30 transition-all"
                  >
                    <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-300">
                      <Package size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-black text-brand-dark line-clamp-1">{item.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-brand-accent"><Minus size={12} /></button>
                          <span className="w-6 text-center text-xs font-black">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-brand-accent"><Plus size={12} /></button>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Un: R$ {item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-brand-dark font-mono">R$ {(item.price * item.quantity).toFixed(2)}</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-[10px] text-red-400 font-bold hover:text-red-600 transition-colors uppercase tracking-widest mt-1">Remover</button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* SUMMARY */}
          <div className="mt-auto pt-8 border-t border-slate-100 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400 font-bold uppercase tracking-wider">Subtotal</span>
              <span className="font-black text-brand-dark font-mono">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400 font-bold uppercase tracking-wider">Desconto</span>
              <span className="font-black text-green-500 font-mono tracking-tighter">- R$ 0,00</span>
            </div>
            <div className="flex justify-between items-end pt-4">
              <span className="text-brand-dark font-black text-xs uppercase tracking-[0.2em]">Total Final</span>
              <span className="text-4xl font-black text-brand-accent font-mono tracking-tighter leading-none">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-6">
              <button 
                onClick={clearCart}
                className="h-14 bg-white border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all"
              >
                Opções
              </button>
              <button 
                onClick={handleFinishVenda}
                disabled={cart.length === 0}
                className="h-14 bg-brand-dark text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-dark/20 hover:scale-[1.02] transition-all disabled:opacity-30 disabled:scale-100"
              >
                Finalizar Venda
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Modal Re-styled */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[40px] shadow-2xl w-full max-w-lg overflow-hidden border border-brand-border"
            >
              <div className="p-10 text-center space-y-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 text-brand-accent rounded-3xl mb-4">
                  <CheckCircle2 size={40} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-brand-dark tracking-tight uppercase">Concluir Venda</h2>
                  <p className="text-slate-400 font-medium">Escolha a forma de pagamento para encerrar o pedido.</p>
                </div>

                <div className="text-6xl font-black text-brand-accent font-mono tracking-tighter my-8 drop-shadow-sm">
                  R$ {subtotal.toFixed(2).replace('.', ',')}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {(['dinheiro', 'cartao', 'pix'] as PaymentMethod[]).map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`p-5 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all ${
                        paymentMethod === method
                          ? 'border-brand-accent bg-blue-50 text-brand-accent scale-105'
                          : 'border-slate-100 text-slate-400 hover:border-slate-200'
                      }`}
                    >
                      <div className={`p-3 rounded-full ${paymentMethod === method ? 'bg-brand-accent text-white' : 'bg-slate-100'}`}>
                        {method === 'pix' ? <Package size={20} /> : <ShoppingCart size={20} />}
                      </div>
                      <span className="font-black uppercase text-[10px] tracking-widest">{method}</span>
                    </button>
                  ))}
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="flex-1 py-5 rounded-[24px] bg-slate-100 text-slate-500 font-black uppercase text-xs tracking-widest hover:bg-slate-200 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmSale}
                    disabled={!paymentMethod}
                    className="flex-[2] py-5 rounded-[24px] bg-brand-dark text-white font-black uppercase text-xs tracking-widest shadow-2xl shadow-brand-dark/30 hover:scale-[1.02] transition-all disabled:opacity-30 disabled:scale-100"
                  >
                    Confirmar Recebimento
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default POS;
