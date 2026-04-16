export type PizzaCategory = 'tradicional' | 'especial' | 'premium';

export interface PizzaSize {
  id: string;
  label: string;
  slices: string;
  serves: string;
}

export const pizzaSizes: PizzaSize[] = [
  { id: 'broto', label: 'Individual', slices: '1 porção', serves: '1 pessoa' },
  { id: 'media', label: 'Médio', slices: '2 porções', serves: '2 pessoas' },
  { id: 'grande', label: 'Grande', slices: '3 porções', serves: '3-4 pessoas' },
  { id: 'familia', label: 'Família', slices: '4 porções', serves: '5+ pessoas' },
];

export interface PizzaFlavor {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  category: PizzaCategory;
  image: string;
  popular?: boolean;
  prices: {
    broto: number;
    media: number;
    grande: number;
    familia: number;
  };
  originalPrices?: {
    broto?: number;
    media?: number;
    grande?: number;
    familia?: number;
  };
}

export const pizzaFlavors: PizzaFlavor[] = [
  {
    id: 'margherita',
    name: 'Clássico da Casa',
    description: 'Nosso mais pedido, com ingredientes frescos e selecionados',
    ingredients: ['Molho especial', 'Queijo premium', 'Temperos frescos', 'Azeite'],
    category: 'tradicional',
    image: '/images/pizza_margherita.jpg',
    popular: true,
    prices: { broto: 22.90, media: 34.90, grande: 44.90, familia: 59.90 },
    originalPrices: { broto: 28.90, media: 42.90, grande: 54.90, familia: 72.90 },
  },
  {
    id: 'calabresa',
    name: 'Sabor Defumado',
    description: 'Intenso e marcante, perfeito para quem gosta de sabor forte',
    ingredients: ['Molho artesanal', 'Queijo', 'Linguiça defumada', 'Cebola'],
    category: 'tradicional',
    image: '/images/pizza_calabresa.jpg',
    popular: true,
    prices: { broto: 24.90, media: 36.90, grande: 46.90, familia: 62.90 },
    originalPrices: { broto: 30.90, media: 44.90, grande: 56.90, familia: 76.90 },
  },
  {
    id: 'portuguesa',
    name: 'Completo Especial',
    description: 'Recheio farto com ingredientes variados',
    ingredients: ['Molho artesanal', 'Queijo', 'Presunto', 'Ovo', 'Cebola', 'Azeitona'],
    category: 'tradicional',
    image: '/images/pizza_portuguesa.jpg',
    prices: { broto: 25.90, media: 38.90, grande: 48.90, familia: 64.90 },
  },
  {
    id: 'frango-catupiry',
    name: 'Cremoso Premium',
    description: 'Combinação perfeita entre cremosidade e sabor',
    ingredients: ['Molho artesanal', 'Queijo', 'Frango desfiado', 'Cream cheese'],
    category: 'especial',
    image: '/images/pizza_frango.jpg',
    popular: true,
    prices: { broto: 27.90, media: 40.90, grande: 52.90, familia: 68.90 },
    originalPrices: { media: 48.90, grande: 62.90 },
  },
  {
    id: '4-queijos',
    name: 'Quatro Queijos',
    description: 'Seleção exclusiva de queijos nobres',
    ingredients: ['Molho artesanal', 'Mussarela', 'Provolone', 'Gorgonzola', 'Parmesão'],
    category: 'especial',
    image: '/images/pizza_4queijos.jpg',
    prices: { broto: 28.90, media: 42.90, grande: 54.90, familia: 72.90 },
    originalPrices: { grande: 64.90, familia: 84.90 },
  },
  {
    id: 'pepperoni',
    name: 'Pepperoni Artesanal',
    description: 'Clássico internacional com toque artesanal',
    ingredients: ['Molho artesanal', 'Mussarela', 'Pepperoni'],
    category: 'especial',
    image: '/images/pizza_pepperoni.jpg',
    popular: true,
    prices: { broto: 29.90, media: 43.90, grande: 55.90, familia: 74.90 },
  },
  {
    id: 'bacon-cheddar',
    name: 'Bacon & Cheddar',
    description: 'Combinação irresistível e defumada',
    ingredients: ['Molho artesanal', 'Mussarela', 'Bacon crocante', 'Cheddar', 'Cebola caramelizada'],
    category: 'premium',
    image: '/images/pizza_bacon_cheddar.jpg',
    prices: { broto: 32.90, media: 46.90, grande: 58.90, familia: 78.90 },
    originalPrices: { grande: 68.90 },
  },
  {
    id: 'camarao',
    name: 'Premium do Chef',
    description: 'Nossa criação exclusiva com ingredientes selecionados',
    ingredients: ['Molho artesanal', 'Mussarela', 'Camarão', 'Cream cheese', 'Tomate cereja'],
    category: 'premium',
    image: '/images/pizza_camarao.jpg',
    prices: { broto: 35.90, media: 52.90, grande: 64.90, familia: 84.90 },
  },
];

export interface ExtraProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  popular?: boolean;
}

export const extraProducts: ExtraProduct[] = [
  {
    id: 'coca-cola-lata',
    name: 'Refrigerante Lata',
    description: '350ml gelado',
    price: 6.00,
    image: '/images/bebidas_v2.jpg',
    category: 'Bebidas',
  },
  {
    id: 'guarana-lata',
    name: 'Guaraná Lata',
    description: '350ml gelado',
    price: 5.50,
    image: '/images/bebidas_v2.jpg',
    category: 'Bebidas',
  },
  {
    id: 'suco-natural',
    name: 'Suco Natural',
    description: 'Laranja, limão ou maracujá',
    price: 10.00,
    image: '/images/bebidas_v2.jpg',
    category: 'Bebidas',
  },
  {
    id: 'coca-cola-2l',
    name: 'Refrigerante 2L',
    description: 'Ideal para compartilhar',
    price: 14.00,
    originalPrice: 16.00,
    image: '/images/bebidas_v2.jpg',
    category: 'Bebidas',
    popular: true,
  },
  {
    id: 'agua-mineral',
    name: 'Água Mineral',
    description: '500ml com ou sem gás',
    price: 4.00,
    image: '/images/bebidas_v2.jpg',
    category: 'Bebidas',
  },
  {
    id: 'brownie',
    name: 'Brownie com Sorvete',
    description: 'Brownie quentinho com sorvete de creme',
    price: 16.90,
    originalPrice: 19.90,
    image: '/images/sobremesa_v2.jpg',
    category: 'Sobremesas',
    popular: true,
  },
  {
    id: 'petit-gateau',
    name: 'Petit Gâteau',
    description: 'Bolo de chocolate com recheio cremoso',
    price: 19.90,
    image: '/images/sobremesa_v2.jpg',
    category: 'Sobremesas',
  },
  {
    id: 'churros',
    name: 'Churros Recheados',
    description: 'Doce de leite ou chocolate (3 unidades)',
    price: 14.90,
    originalPrice: 17.90,
    image: '/images/sobremesa_v2.jpg',
    category: 'Sobremesas',
  },
];

export const bordas = [
  { name: 'Sem adicional de borda', price: 0 },
  { name: 'Cream cheese', price: 8.00 },
  { name: 'Cheddar', price: 8.00 },
  { name: 'Chocolate', price: 10.00 },
];

export const adicionais = [
  { name: 'Bacon extra', price: 6.00, popular: true },
  { name: 'Cheddar extra', price: 5.00 },
  { name: 'Cream cheese extra', price: 5.00 },
  { name: 'Calabresa extra', price: 5.00 },
  { name: 'Mussarela extra', price: 4.00 },
  { name: 'Cebola caramelizada', price: 4.00 },
  { name: 'Azeitona extra', price: 3.00 },
  { name: 'Tempero especial', price: 2.00 },
];

export const WHATSAPP_NUMBER = '5511933651215';

export const STORE_NAME = 'Seu Delivery';

export const STORE_DESCRIPTION = 'Cardápio digital completo, moderno e profissional para o seu delivery. Sistema de pedidos integrado via WhatsApp, personalização de produtos e relatórios — tudo em um só lugar.';

export const STORE_DESCRIPTION_2 = 'Aumente suas vendas com um cardápio profissional que seus clientes vão amar. Responsivo, rápido e pronto para impulsionar o seu negócio.';

export const STORE_ADDRESS = {
  street: 'Seu endereço aqui',
  neighborhood: 'Seu bairro',
  city: 'Sua cidade - UF',
  cep: 'CEP: 00000-000',
};

export const STORE_HOURS = [
  { day: 'Segunda-feira', hours: '18:00 - 23:00' },
  { day: 'Terça-feira', hours: '18:00 - 23:00' },
  { day: 'Quarta-feira', hours: '18:00 - 23:00' },
  { day: 'Quinta-feira', hours: '18:00 - 23:00' },
  { day: 'Sexta-feira', hours: '18:00 - 00:00' },
  { day: 'Sábado', hours: '18:00 - 00:00' },
  { day: 'Domingo', hours: '18:00 - 22:00' },
];

export const STORE_PHONE = '(00) 00000-0000';
