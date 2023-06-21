import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { createProduct } from '../api/productsApi';

export const ProductsForm: React.FC = () => {
  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']); // Actualiza los datos de un get mediante su llave
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const product = Object.fromEntries(formData);
    addProductMutation.mutate({ ...product, inStock: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>Name</label>
      <input type='text' id='name' name='name' />

      <label htmlFor='description'>Description</label>
      <input type='text' id='description' name='description' />

      <label htmlFor='price'>Price</label>
      <input type='text' id='price' name='price' />

      <button type='submit'>Add Product</button>
    </form>
  );
};
