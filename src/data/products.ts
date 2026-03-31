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
    priceTrufado: 22.00,
    description: 'Perfeito para um lanche rápido',
    image: '/assets/foto_01.jpg',
  },
  {
    id: '400ml',
    label: 'Açaí 400ml',
    size: '400ml',
    originalTradicional: 24.99,
    priceTradicional: 19.99,
    priceTrufado: 28.00,
    description: 'Tamanho ideal para matar a fome',
    image: '/assets/foto_04.jpg',
  },
  {
    id: '500ml',
    label: 'Açaí 500ml',
    size: '500ml',
    originalTradicional: 31.99,
    priceTradicional: 25.59,
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
  { name: 'Nutella', price: 12.00, description: '', popular: true },
  { name: 'Morango', price: 5.00, description: '' },
  { name: 'Banana', price: 5.00, description: '' },
  { name: 'Leite em Pó', price: 5.00, description: '' },
  { name: 'Granola', price: 5.00, description: '' },
  { name: 'Sucrilhos', price: 5.00, description: '' },
  { name: 'Amendoim', price: 5.00, description: '' },
  { name: 'Paçoca', price: 5.00, description: '' },
  { name: 'Confete', price: 5.00, description: '' },
  { name: 'Chocobol', price: 5.00, description: '' },
  { name: 'Ovomaltine', price: 5.00, description: '' },
  { name: 'Creme de Leite em Pó', price: 8.00, description: '' },
  { name: 'Creme de Avelã', price: 8.00, description: '' },
  { name: 'Cobertura Fini Beijos (Morango)', price: 5.00, description: '' },
  { name: 'Cobertura Fini Dentaduras (Framboesa)', price: 5.00, description: '' },
  { name: 'Cobertura Fini Bananas', price: 5.00, description: '' },
];

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

export const trufadoCremes = ['Creme de Avelã', 'Creme de Leite em Pó'];

export const WHATSAPP_NUMBER = '5511933651215';

export const STORE_NAME = 'Sua Açaíteria';

export const STORE_DESCRIPTION = 'Um cardápio digital completo, moderno e personalizado para a sua açaíteria. Sistema de pedidos integrado via WhatsApp, personalização de açaí, controle de pedidos e relatórios — tudo em um só lugar.';

export const STORE_DESCRIPTION_2 = 'Aumente suas vendas com um cardápio profissional que seus clientes vão amar. Fácil de usar, responsivo para celular e pronto para impulsionar o seu negócio.';

export const STORE_ADDRESS = {
  street: 'Seu endereço aqui',
  neighborhood: 'Seu bairro',
  city: 'Sua cidade - UF',
  cep: 'CEP: 00000-000',
};

export const STORE_HOURS = [
  { day: 'Segunda-feira', hours: '09:00 - 22:00' },
  { day: 'Terça-feira', hours: '09:00 - 22:00' },
  { day: 'Quarta-feira', hours: '09:00 - 22:00' },
  { day: 'Quinta-feira', hours: '09:00 - 22:00' },
  { day: 'Sexta-feira', hours: '09:00 - 23:00' },
  { day: 'Sábado', hours: '10:00 - 23:00' },
  { day: 'Domingo', hours: '10:00 - 20:00' },
];

export const STORE_PHONE = '(00) 00000-0000';
