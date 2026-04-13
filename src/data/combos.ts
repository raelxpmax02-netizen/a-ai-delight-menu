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
    name: 'Combo Individual',
    description: 'Perfeito para matar a fome sozinho',
    items: ['1 Pizza Broto (qualquer sabor)', '1 Refrigerante Lata 350ml'],
    price: 29.90,
    originalPrice: 36.90,
    image: '/images/combo_pizza.jpg',
    badge: 'Mais vendido',
    popular: true,
  },
  {
    id: 'combo-casal',
    name: 'Combo Casal',
    description: 'Ideal para um jantar a dois',
    items: ['1 Pizza Média (qualquer sabor)', '2 Refrigerantes Lata 350ml', '1 Sobremesa'],
    price: 54.90,
    originalPrice: 68.90,
    image: '/images/combo_casal.jpg',
  },
  {
    id: 'combo-familia',
    name: 'Combo Família',
    description: 'Para reunir toda a família',
    items: ['2 Pizzas Grandes (qualquer sabor)', '1 Refrigerante 2L', '1 Sobremesa'],
    price: 99.90,
    originalPrice: 132.90,
    image: '/images/combo_familia.jpg',
    popular: true,
  },
];
