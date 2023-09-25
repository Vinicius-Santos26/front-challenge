import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

export function Users() {
  return (
    <Flex direction="column" gap="4">
      <Heading>Usuários</Heading>
      <Flex>
        <Button colorScheme='brand'>Adicionar usúarios</Button>
      </Flex>
      <VStack width="full">
        <LinkBox width="full">
          <Card padding="4" display="flex"  flexDirection='row'  justifyContent="space-between" width="full">
            <Flex flexDirection="column" gap="1">
              <CardHeader padding="0" display="flex" gap="4">
                <LinkOverlay href="#">
                  <Heading fontSize="md">Henrique Alves da Silva</Heading>
                  
                </LinkOverlay>
                <Badge colorScheme='green'>ADMINISTRATOR</Badge>
              </CardHeader>
              <CardBody
                display="flex"
                gap="2"
                alignItems="center"
                padding="0"
                justifyContent="space-between"
              >
                <Text fontSize="sm">email@email.com.br</Text>
              </CardBody>     
            </Flex>

            <HStack spacing="8">
              <IconButton
                colorScheme="blue"
                aria-label="edit"
                size="md"
                icon={<FaEdit />}
              />
              <IconButton
                colorScheme="red"
                aria-label="inactive"
                size="md"
                icon={<FaTrash />}
              />
            </HStack>
          </Card>
        </LinkBox>
      </VStack>
    </Flex>
  );
}
