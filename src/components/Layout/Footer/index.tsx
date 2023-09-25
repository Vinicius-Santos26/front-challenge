import {
  Box,
  chakra,
  Container,
  Image,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { ReactNode } from 'react';

import EverymindLogo from '../../../assets/everymind-logo.png';

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={12}
      h={12}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={2}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Box maxHeight="48px">
          <Image src={EverymindLogo} />
        </Box>

        <Text>© 2023 Everymind. All rights reserved</Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label='Facebook' href='https://www.facebook.com/everymindbr'>
            <FaFacebook size={24} />
          </SocialButton>
          <SocialButton label='Instagram' href='https://www.instagram.com/everymind.company'>
            <FaInstagram size={24} />
          </SocialButton>
          <SocialButton label='Linkedin' href='https://www.linkedin.com/company/everymind-cloud'>
            <FaLinkedin size={24} />
          </SocialButton>     
        </Stack>
      </Container>
    </Box>
  );
}