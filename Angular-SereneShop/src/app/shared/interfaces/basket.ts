import cuid from "cuid"

export interface BasketItem {
  id: number
  name: string
  description: string
  price: number
  imageCover: string
  images: string[]
  quantity: number
  ratingsAverage: number
  brand: string
  category: string
}

export interface Basket {
  id: string;
  items: BasketItem[];
  deliveryMethodId?: number;
  paymentInentId?: string;
  clientSecret?: string;
  shippingPrice: number;
}

export class Basket implements Basket{
  id = cuid();
  items: BasketItem[] = [];
  shippingPrice = 0;
}

export interface BasketTotals{
  shipping: number;
  subtotal: number;
  total: number;
}

