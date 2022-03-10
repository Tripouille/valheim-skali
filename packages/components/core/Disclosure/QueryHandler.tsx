import { UseQueryResult } from 'react-query';
import { Children } from '@packages/utils/types';
import ErrorAlert from '@packages/components/core/Feedback/ErrorAlert';
import Loading from '@packages/components/core/Feedback/Loading';

export interface QueryHandlerProps<T> {
  query: UseQueryResult<T, unknown>;
  children: Children;
}

/** Displays a loading/error component on loading/error query,
 * or children in case of query success
 */
const QueryHandler = <T extends object>({ query, children }: QueryHandlerProps<T>) => {
  switch (query.status) {
    case 'loading':
      return <Loading />;
    case 'success':
      return <>{children}</>;
    case 'error':
      return <ErrorAlert error={query.error} />;
    default:
      return <Loading />;
  }
};

export default QueryHandler;
