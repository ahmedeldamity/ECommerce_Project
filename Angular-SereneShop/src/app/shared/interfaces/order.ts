import { Address } from "./user"

export interface OrderToCreate {
  basketId: string;
  deliveryMethodId: string;
  shippingAddress: Address;
}

export interface Order {
  id: number
  buyerEmail: string
  orderDate: string
  status: string
  shippingAddress: Address
  deliveryMethod: string
  deliveryMethodCost: number
  items: Item[]
  subtotal: number
  total: number
  paymentIntentId: string
}

export interface Item {
  id: number
  productId: number
  productName: string
  imageCover: string
  price: number
  quantity: number
}
