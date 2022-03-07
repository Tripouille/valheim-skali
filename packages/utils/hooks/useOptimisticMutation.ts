import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import { getMessageFromError } from '../error';
import { QueryTypes } from '../queryClient';
import { displayErrorToast, displaySuccessToast } from '../toast';

interface UseOptimisticMutationContext<T> {
  previousData?: T;
}

const useOptimisticMutation = <T extends keyof QueryTypes, TVariables = void>(
  associatedQueryKey: T,
  mutationFn: MutationFunction<void, TVariables>,
  getNewData: (previousData: QueryTypes[T], variables: TVariables) => QueryTypes[T],
  successMessage: string,
) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<
    void,
    unknown,
    TVariables,
    UseOptimisticMutationContext<QueryTypes[T]>
  >(mutationFn, {
    onMutate: (variables: TVariables) => {
      queryClient.cancelQueries(associatedQueryKey);
      const previousData = queryClient.getQueryData<QueryTypes[T]>(associatedQueryKey);
      if (previousData)
        queryClient.setQueryData<QueryTypes[T]>(
          associatedQueryKey,
          getNewData(previousData, variables),
        );
      return { previousData };
    },
    onError: (
      error: unknown,
      variables: TVariables,
      context?: UseOptimisticMutationContext<QueryTypes[T]>,
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData<QueryTypes[T]>(associatedQueryKey, context.previousData);
      }
      displayErrorToast({
        title: getMessageFromError(error),
        description: 'Les changements ont été annulés.',
      });
    },
    onSuccess: () => displaySuccessToast({ title: successMessage }),
    onSettled: () => queryClient.invalidateQueries(associatedQueryKey),
  });

  return mutate;
};

export default useOptimisticMutation;
