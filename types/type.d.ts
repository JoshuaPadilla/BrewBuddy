declare interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  number: string;
  email: string;
  cart: OrderItem[];
}

declare interface LoginForm {
  email: string;
  password: string;
}

declare interface RegistrationForm {
  firstName: string;
  lastName: string;
  number: string;
  email: string;
  password: string;
  confirmPassword: string;
}

declare interface UpdateForm {
  firstName: string;
  lastName: string;
  number: string;
}

declare interface Product {
  _id?: string;
  productName: string;
  productCategory: string;
  productBasePrice: number;
  productDescription: string;
  productImageUrl?: string;
}

declare interface OrderItem {
  _id?: string;
  productID: Product;
  quantity: number;
  addOns: { name: string; price: number };
  itemSize: { name: string; price: number };
  sweetnessLevel: { name: string; price: number };
  itemTotalPrice: number;
}

declare interface OrderItemForm {
  productID?: String;
  quantity: number;
  addOns: { name: string; price: number };
  itemSize: { name: string; price: number };
  sweetnessLevel: { name: string; price: number };
  itemTotalPrice: number;
}

declare interface OptionItem {
  name: string;
  price: number;
}

declare interface Order {
  _id: string;
  userID?: string;
  items: OrderItem[];
  totalPrice: number;
  orderDate: String;
  status: "pending" | "processing" | "completed" | "cancelled";
  customerNote: string;
}

declare interface OrderForm {
  items: OrderItem[];
  totalPrice: number;
  customerNote?: string;
}
