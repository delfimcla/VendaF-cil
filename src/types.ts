export interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type PaymentMethod = 'dinheiro' | 'cartao' | 'pix';

export interface Sale {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: PaymentMethod;
  timestamp: Date;
}

export const INITIAL_PRODUCTS: Product[] = [
  { id: '1', code: 'BEB001', name: 'Café Expresso', category: 'Bebidas', price: 5.50, stock: 15 },
  { id: '2', code: 'BEB002', name: 'Suco Natural', category: 'Bebidas', price: 7.00, stock: 12 },
  { id: '3', code: 'SOB001', name: 'Bolo de Chocolate', category: 'Sobremesas', price: 12.00, stock: 20 },
  { id: '4', code: 'SOB002', name: 'Pudim de Leite', category: 'Sobremesas', price: 8.00, stock: 25 },
  { id: '5', code: 'SAL001', name: 'Coxinha de Frango', category: 'Salgados', price: 6.50, stock: 5 },
  { id: '6', code: 'SAL002', name: 'Pão de Queijo', category: 'Salgados', price: 4.00, stock: 40 },
  { id: '7', code: 'BEB003', name: 'Refrigerante 350ml', category: 'Bebidas', price: 5.00, stock: 30 },
  { id: '8', code: 'SOB003', name: 'Torta de Limão', category: 'Sobremesas', price: 9.50, stock: 8 },
];
