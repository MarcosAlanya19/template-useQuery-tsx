<h1 align="center">Welcome to react-query 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/react-query" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/react-query.svg">
  </a>
</p>

> Ejemplo de peticiones respecto a useQuery

## Install

```sh
yarn install
```

## Instalacion ReactQuery

Primeramente se instala la siguiente dependencia:

```typescript
yarn add @tanstack/react-query
```

Luego se debe colocar en la configuracion del archivo main.tsx || main.jsx

```typescript
const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
```

En segundo lugar se descargar la dependencia dev-tools

```typescript
yarn add @tanstack/react-query-devtools
```

Luego tambien se agrega este componente en el archivo main.tsx | main.jsx

```typescript
const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
```

## Peticiones Base

Antes de nada tienes que crear las peticiones basem tanto sea en axios o fetch:

```typescript
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
```

## Peticiones Query

Un ejemplo de peticion **GET**

```typescript
const {
  isLoading,
  data: products,
  isError,
} = useQuery({
  queryKey: ['products'],
  queryFn: getProducts,
  select: (products) => products.sort((a: any, b: any) => b.id - a.id),
});

...products?.map((data) =>...
```

En los siguientes ejemplos se usa: `const queryClient = useQueryClient()` donde se agrega la key, de la peticion get relacionada para poder actualizar en tiempo real la data, sin necesidad de recargar la pagina.

Un ejemplo de peticion **POST**

```typescript
const queryClient = useQueryClient();

const addProductMutation = useMutation({
  mutationFn: createProduct,
  onSuccess: () => {
    queryClient.invalidateQueries(['products']);
  },
});

...addProductMutation.mutate({ ...product, inStock: true });...
```

Un ejemplo de peticion **DELETE**

```typescript
const queryClient = useQueryClient();

const deleteProductMutation = useMutation({
  mutationFn: deleteProduct,
  onSuccess: () => {
    queryClient.invalidateQueries(['products']);
  },
});

...={() => deleteProductMutation.mutate(data.id)}
```

Un ejemplo de peticion **UPDATE**

```typescript
const queryClient = useQueryClient();

const updateProductMutation = useMutation({
  mutationFn: updateProduct,
  onSuccess: () => {
    queryClient.invalidateQueries(['products']);
  },
});

...={(e) => {
  updateProductMutation.mutate({
    ...data,
    inStock: e.target.checked,
  });
}}
```
