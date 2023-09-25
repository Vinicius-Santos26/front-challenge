import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Center
} from '@chakra-ui/react';

import { RiCloudLine, RiMenuLine } from 'react-icons/ri';
import { useAuth } from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function Header() {
  const { user } = useAuth();

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        paddingX="8"
        paddingY="4"
        bg="brand.500"
      >
        <Box color="white">
          <RiCloudLine size={32} />
        </Box>

        <Flex alignItems="center">
          <Stack direction="row" spacing={7}>
            {!user ? (
              <Flex gap='4'>
                 <Button as={Link} to="/signin">
                 Entrar
                </Button>
                <Button >Cadastre-se gratuitamente</Button>
              </Flex>
            ) : (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                  minW={0}
                  color="white"
                  _active={{ color: 'blackAlpha.800' }}
                >
                  <RiMenuLine size={32} />
                </MenuButton>
                <MenuList alignItems="center">
                  <Center>
                    <Avatar
                      size="2xl"
                      src="https://avatars.dicebear.com/api/male/username.svg"
                    />
                  </Center>

                  <Center>
                    <p>Username</p>
                  </Center>
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            )}
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
