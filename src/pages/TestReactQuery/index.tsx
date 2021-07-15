import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import axios from 'axios';

const queryClient = new QueryClient();

function TestReactQueryInner() {
  const { isLoading, data, error, isFetching } = useQuery(
    'repoData',
    async (): Promise<any> => {
      const { data } = await axios.get<any>('https://api.github.com/repos/tannerlinsley/react-query');
      return data;
    },
    {}
  );

  if (isLoading) return <div>Loading...</div>;

  if (error instanceof Error) return <div>{'An error has occurred: ' + error.message}</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong> <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? 'Updating...' : ''}</div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}

export default function TestReactQuery() {
  return (
    <QueryClientProvider client={queryClient}>
      <TestReactQueryInner />
    </QueryClientProvider>
  );
}
