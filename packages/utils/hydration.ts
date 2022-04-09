import { dehydrate, QueryClient } from 'react-query';
import { ServerException } from '@packages/api/common';
import { HydrationProps } from '@packages/utils/types';

const getHydrationProps = async (
  populate: (queryClient: QueryClient) => Promise<void>,
): Promise<HydrationProps> => {
  const queryClient = new QueryClient();

  try {
    await populate(queryClient);
  } catch (e) {
    if (e instanceof ServerException)
      console.error('Error happened in server side rendering :', e.statusCode);
    else throw e;
  }

  return { dehydratedState: JSON.stringify(dehydrate(queryClient)) };
};

export default getHydrationProps;
