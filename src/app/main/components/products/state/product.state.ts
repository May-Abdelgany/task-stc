import { product } from "src/app/main/models/product.model";

export interface ProductState {
    products: product[];
    loading: boolean;
    error: string | null;
  }