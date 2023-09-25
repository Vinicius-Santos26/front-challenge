import { Flex } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';
import { AuthProvider } from '../../context/auth';
import { Main } from './Main';

export function Layout() {
  return (
    <AuthProvider>
      <Flex minHeight="100vh" flexDirection="column">
        <Header />
        <Main/>
        <Footer />
      </Flex>
    </AuthProvider>
  );
}
