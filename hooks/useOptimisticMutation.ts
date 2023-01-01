import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { getMessageFromError } from 'utils/error';
import { QueryTypes } from 'utils/queryClient';
import { displayErrorToast, displaySuccessToast } from 'utils/toast';

interface UseOptimisticMutationContext<T> {
  previousData?: T;
}

const useOptimisticMutation = <T extends keyof QueryTypes, TVariables = void>(
  associatedQueryKey: T,
  mutationFn: MutationFunction<void, TVariables>,
  getNewData: (previousData: QueryTypes[T], variables: TVariables) => QueryTypes[T],
  successMessage?: string,
  options?: Omit<
    UseMutationOptions<void, unknown, TVariables, UseOptimisticMutationContext<QueryTypes[T]>>,
    'mutationFn'
  >,
) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<
    void,
    unknown,
    TVariables,
    UseOptimisticMutationContext<QueryTypes[T]>
  >(mutationFn, {
    onMutate: (variables: TVariables) => {
      queryClient.cancelQueries([associatedQueryKey]);
      const previousData = queryClient.getQueryData<QueryTypes[T]>([associatedQueryKey]);
      if (previousData)
        queryClient.setQueryData<QueryTypes[T]>(
          [associatedQueryKey],
          getNewData(previousData, variables),
        );
      if (options?.onMutate) options.onMutate(variables);
      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<QueryTypes[T]>([associatedQueryKey], context.previousData);
      }
      displayErrorToast({
        title: getMessageFromError(error),
        description: 'Les changements ont été annulés.',
      });
      if (options?.onError) options.onError(error, variables, context);
    },
    onSuccess: (data, variables, context) => {
      if (successMessage) displaySuccessToast({ title: successMessage });
      if (options?.onSuccess) options.onSuccess(data, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries([associatedQueryKey]);
      if (options?.onSettled) options.onSettled(data, error, variables, context);
    },
  });

  return mutate;
};

export default useOptimisticMutation;
