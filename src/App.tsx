import { ChakraProvider } from '@chakra-ui/react';
import { router } from './routes';
import { theme } from './styles/theme';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import VLibras from '@djpfs/react-vlibras';

function App() {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider resetCSS theme={theme}>
      <QueryClientProvider client={queryClient}>
        <VLibras forceOnload={true} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
