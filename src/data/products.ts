export type AcaiType = 'tradicional' | 'trufado';

export interface AcaiSize {
  id: string;
  label: string;
  size: string;
  priceTradicional: number;
  priceTrufado: number;
  image: string;
  description: string;
}

export const acaiSizes: AcaiSize[] = [
  {
    id: '300ml',
    label: 'Açaí 300ml',
    size: '300ml',
    priceTradicional: 12.00,
    priceTrufado: 15.00,
    description: 'Perfeito para um lanche rápido',
    image: '/assets/foto_01.jpg',
  },
  {
    id: '400ml',
    label: 'Açaí 400ml',
    size: '400ml',
    priceTradicional: 16.00,
    priceTrufado: 20.00,
    description: 'Tamanho ideal para matar a fome',
    image: '/assets/foto_04.jpg',
  },
  {
    id: '500ml',
    label: 'Açaí 500ml',
    size: '500ml',
    priceTradicional: 19.00,
    priceTrufado: 25.00,
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
  { name: 'Adicional complemento', price: 4.00, description: 'Fruta e adicionais tradicionais' },
  { name: 'Adicional Gourmet', price: 6.00, description: 'Creme de avelã, Creme de ninho e Ao leite' },
  { name: 'Adicional Nutella', price: 7.00, description: '' },
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
