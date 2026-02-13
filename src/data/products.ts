export interface AcaiSize {
  id: string;
  label: string;
  size: string;
  price: number;
  image: string;
  description: string;
}

export const acaiSizes: AcaiSize[] = [
  {
    id: '300ml',
    label: 'Açaí 300ml',
    size: '300ml',
    price: 14.00,
    description: 'Perfeito para um lanche rápido',
    image: '/assets/foto_01.jpg',
  },
  {
    id: '500ml',
    label: 'Açaí 500ml',
    size: '500ml',
    price: 18.00,
    description: 'Tamanho ideal para matar a fome',
    image: '/assets/foto_04.jpg',
  },
  {
    id: '700ml',
    label: 'Açaí 700ml',
    size: '700ml',
    price: 25.00,
    description: 'Para quem ama açaí',
    image: '/assets/foto_03.jpg',
  },
  {
    id: '1L',
    label: 'Açaí 1 Litro',
    size: '1 Litro',
    price: 35.00,
    description: 'Tamanho da família',
    image: '/assets/foto_02.jpg',
  },
];

export const freeComplements = [
  'Granola',
  'Leite em pó',
  'Paçoca',
  'Banana',
  'Morango',
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
// Logo and images are imported in components from @/assets/
