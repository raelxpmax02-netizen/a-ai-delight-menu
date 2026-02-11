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
    image: 'https://readdy.ai/api/search-image?query=small%20acai%20bowl%20300ml%20size%20with%20fresh%20strawberries%20and%20granola%20topping%20purple%20acai%20cream%20in%20white%20bowl%20clean%20simple%20white%20background%20product%20photography%20centered%20composition%20professional%20food%20styling%20appetizing%20presentation&width=400&height=400&seq=acai-300ml-001&orientation=squarish',
  },
  {
    id: '500ml',
    label: 'Açaí 500ml',
    size: '500ml',
    price: 18.00,
    description: 'Tamanho ideal para matar a fome',
    image: 'https://static.readdy.ai/image/60ed8358a038503cc3a83fd034222a0b/8792320e313431ce1fda4e3b3802a105.jpeg',
  },
  {
    id: '700ml',
    label: 'Açaí 700ml',
    size: '700ml',
    price: 25.00,
    description: 'Para quem ama açaí',
    image: 'https://static.readdy.ai/image/60ed8358a038503cc3a83fd034222a0b/f7d51dac5d8bc66c74a298da0a1bec4a.jpeg',
  },
  {
    id: '1L',
    label: 'Açaí 1 Litro',
    size: '1 Litro',
    price: 35.00,
    description: 'Tamanho da família',
    image: 'https://readdy.ai/api/search-image?query=extra%20large%20acai%20bowl%201%20liter%20size%20with%20abundant%20toppings%20strawberries%20banana%20granola%20chocolate%20and%20condensed%20milk%20deep%20purple%20acai%20in%20large%20white%20bowl%20clean%20simple%20white%20background%20product%20photography%20centered%20view%20professional%20food%20styling%20family%20size%20portion&width=400&height=400&seq=acai-1l-001&orientation=squarish',
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
export const LOGO_URL = 'https://public.readdy.ai/ai/img_res/f9883487-0e97-4152-93d4-b38358874d45.png';
export const HERO_IMAGE = 'https://readdy.ai/api/search-image?query=fresh%20acai%20bowl%20with%20granola%20strawberries%20and%20banana%20on%20rustic%20wooden%20table%20natural%20lighting%20vibrant%20purple%20color%20healthy%20breakfast%20food%20photography%20top%20view%20minimalist%20clean%20background%20professional%20food%20styling&width=1920&height=1080&seq=hero-bg-001&orientation=landscape';
