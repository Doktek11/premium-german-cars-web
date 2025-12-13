export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  km: number;
  image: string;
  engine: string;
  status: 'Disponible' | 'Reservado' | 'Vendido';
  description?: string;
  gallery?: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  car: string;
  text: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}