import {
  QueryFunction,
  useMutation,
  useQuery,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query';

export const useQueryGet = <T,>(key: string, queryFunction: QueryFunction<T>) => {
  return useQuery({
    queryKey: [key],
    queryFn: queryFunction,
  });
};

// export const useQueryDelete = <T,>(
//   key: string,
//   queryFunction: MutationFunction<T>
// ) => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: queryFunction,
//     onSuccess: () => {
//       queryClient.invalidateQueries([key]);
//     },
//   });
// };
