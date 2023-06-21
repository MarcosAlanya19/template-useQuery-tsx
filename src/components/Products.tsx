import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { deleteProduct, getProducts, updateProduct } from '../api/productsApi';
import { useQueryGet } from '../hooks/useQueryPetition';

export const Products: React.FC = () => {
  const queryClient = useQueryClient();

  // const {
  //   isLoading,
  //   data: products,
  //   isError,
  // } = useQuery({
  //   queryKey: ['products'],
  //   queryFn: getProducts,
  //   select: (products) => products.sort((a: any, b: any) => b.id - a.id),
  // });

  const {
    data: products,
    isLoading,
    isError,
  } = useQueryGet('products', getProducts);

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error: Server Error</div>;
  }

  return products?.map((data) => (
    <div key={data.id}>
      <h3>{data.name}</h3>
      <p>{data.description}</p>
      <p>{data.price}</p>
      <button onClick={() => deleteProductMutation.mutate(data.id)}>Delete</button>
      <input
        type='checkbox'
        checked={data.inStock}
        onChange={(e) => {
          updateProductMutation.mutate({
            ...data,
            inStock: e.target.checked,
          });
        }}
      />
      <label htmlFor=''>In Stock</label>
    </div>
  ));
};
