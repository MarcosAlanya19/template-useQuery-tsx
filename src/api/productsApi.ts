import axios from 'axios';
import { IProduct, PartialProduct } from '../types/types';

const productApi = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getProducts = async (): Promise<IProduct[]> => {
  const { data } = await productApi.get('/products');
  return data;
};

export const createProduct = (product: PartialProduct) => {
  return productApi.post('/products', product);
};

export const deleteProduct = async (id: number) => {
  return await productApi.delete(`/products/${id}`);
};

export const updateProduct = (product: PartialProduct) => {
  return productApi.put(`/products/${product.id}`, product);
};
