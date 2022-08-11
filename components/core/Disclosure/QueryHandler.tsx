import { UseQueryResult } from 'react-query';
import { Children } from 'utils/types';
import ErrorAlert from 'components/core/Feedback/ErrorAlert';
import Loading from 'components/core/Feedback/Loading';

export interface QueryHandlerProps<T> {
  query: UseQueryResult<T, unknown>;
  fallbackData?: T | null;
  children: Children;
  loadingComponent?: Children;
}

/** Displays a loading/error component on loading/error query,
 * or children in case of query success.
 * If query is loading but fallbackData is present, display children
 */
const QueryHandler = <T extends object>({
  query,
  fallbackData,
  children,
  loadingComponent = <Loading />,
}: QueryHandlerProps<T>) => {
  switch (query.status) {
    case 'success':
      return <>{children}</>;
    case 'error':
      if (query.isFetching) return <>{loadingComponent}</>;
      return <ErrorAlert error={query.error} />;
    default:
      // includes case 'loading'
      if (fallbackData) return <>{children}</>;
      return <>{loadingComponent}</>;
  }
};

export default QueryHandler;
