// src/api/products/ProductApi.ts
import apiClient from "../apiClient";
import GenericApi from "../GenericApi";
import type { Product } from "./product.types";

const ProductApi = new GenericApi<Product>(
  "https://fakestoreapi.com/products"
);

export const getProducts = async (): Promise<Product[]> => {
    const res = await apiClient.get<Product[]>("https://fakestoreapi.com/productss");
    return res.data;
}

export default ProductApi;