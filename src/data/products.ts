export type AcaiType = 'tradicional' | 'trufado';

export interface AcaiSize {
  id: string;
  label: string;
  size: string;
  priceTradicional: number;
  priceTrufado: number;
  promoTradicional?: number;
  promoTrufado?: number;
  originalTradicional?: number;
  originalTrufado?: number;
  image: string;
  description: string;
}

export const acaiSizes: AcaiSize[] = [
  {
    id: '300ml',
    label: 'Açaí 300ml',
    size: '300ml',
    originalTradicional: 17.99,
    priceTradicional: 14.39,
    originalTrufado: 22.49,
    priceTrufado: 17.99,
    description: 'Perfeito para um lanche rápido',
    image: '/assets/foto_01.jpg',
  },
  {
    id: '400ml',
    label: 'Açaí 400ml',
    size: '400ml',
    originalTradicional: 29.99,
    priceTradicional: 19.99,
    originalTrufado: 24.99,
    priceTrufado: 19.99,
    description: 'Tamanho ideal para matar a fome',
    image: '/assets/foto_04.jpg',
  },
  {
    id: '500ml',
    label: 'Açaí 500ml',
    size: '500ml',
    originalTradicional: 31.99,
    priceTradicional: 25.99,
    originalTrufado: 39.99,
    priceTrufado: 31.99,
    description: 'Para quem ama açaí',
    image: '/assets/foto_03.jpg',
  },
];

export const fruits = ['Banana', 'Uva', 'Morango'];

export const freeComplements = [
  'Leite em pó',
  'Ovomaltine',
  'Sucrilhos',
  'Chocoboll',
  'Paçoca',
  'Granola',
  'Amendoim',
  'Cobertura fini - morango',
  'Cobertura fini - banana',
];

export const adicionais = [
  { name: 'Adicional complemento', price: 5.00, description: 'Fruta e adicionais tradicionais' },
  { name: 'Adicional Gourmet', price: 5.00, description: 'Creme de avelã, Creme de ninho e Ao leite' },
  { name: 'Adicional Nutella', price: 5.00, description: '' },
];

// Keep for backward compatibility but no longer used in new menu
export const paidComplements = [
  { name: 'Leite Ninho', price: 2.00 },
  { name: 'Nutella', price: 2.00 },
  { name: 'KitKat', price: 2.00 },
  { name: 'Bis', price: 2.00 },
  { name: 'Ovomaltine', price: 2.00 },
];

export const sauces = [
  'Chocolate',
  'Morango',
  'Caramelo',
  'Leite condensado',
];

export const WHATSAPP_NUMBER = '5511977069676';
export const INSTAGRAM_URL = 'https://www.instagram.com/mariah.acaiteria/';

export const STORE_NAME = 'Mariah Açaíteria';

export const STORE_DESCRIPTION = 'Na nossa açaíteria você encontra açaí cremoso, fresquinho e montado do jeitinho que você gosta. Trabalhamos com ingredientes de qualidade, opções simples e caprichadas, além de um atendimento acolhedor que faz você se sentir em casa.';

export const STORE_DESCRIPTION_2 = 'Temos açaí no copo, transferências especiais, frutas, coberturas variadas e aquele sabor que dá vontade de voltar sempre. Cada detalhe é preparado com amor para entregar uma experiência gostosa e leve a qualquer hora do dia.';

export const STORE_ADDRESS = {
  street: 'R. Santa Maria do Salto, 217',
  neighborhood: 'Parque das Nações',
  city: 'Guarulhos - SP',
  cep: 'CEP: 07243-540',
};

export const STORE_HOURS = [
  { day: 'Segunda-feira', hours: 'Fechado' },
  { day: 'Terça-feira', hours: '11:00 - 19:00' },
  { day: 'Quarta-feira', hours: '11:00 - 19:00' },
  { day: 'Quinta-feira', hours: '15:00 - 19:00' },
  { day: 'Sexta-feira', hours: '11:30 - 20:00' },
  { day: 'Sábado', hours: '12:30 - 19:00' },
  { day: 'Domingo', hours: '12:00 - 17:00' },
];

export const STORE_PHONE = '(11) 97706-9676';
