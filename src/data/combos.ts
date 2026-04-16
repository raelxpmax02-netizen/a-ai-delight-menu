export interface Combo {
  id: string;
  name: string;
  description: string;
  items: string[];
  price: number;
  originalPrice: number;
  image: string;
  badge?: string;
  popular?: boolean;
}

export const combos: Combo[] = [
  {
    id: 'combo-individual',
    name: 'Combo Solo',
    description: 'Perfeito para uma pessoa',
    items: ['1 Produto Individual', '1 Bebida 350ml'],
    price: 29.90,
    originalPrice: 36.90,
    image: '/images/combo_pizza.jpg',
    badge: 'Mais vendido',
    popular: true,
  },
  {
    id: 'combo-casal',
    name: 'Combo Duo',
    description: 'Ideal para dividir a dois',
    items: ['1 Produto Médio', '2 Bebidas 350ml', '1 Sobremesa'],
    price: 54.90,
    originalPrice: 68.90,
    image: '/images/combo_casal.jpg',
  },
  {
    id: 'combo-familia',
    name: 'Combo Família',
    description: 'Para reunir todo mundo',
    items: ['2 Produtos Grandes', '1 Bebida 2L', '1 Sobremesa'],
    price: 99.90,
    originalPrice: 132.90,
    image: '/images/combo_familia.jpg',
    popular: true,
  },
];
