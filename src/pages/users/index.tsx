import {
  Button,
  Card,
  CardBody,
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
import { InactiveUser, getUsers } from '../../services/users';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export function Users() {
  const queryClient = useQueryClient();
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });


  const inactiveUser = useMutation({
    mutationFn: (userId:string) => InactiveUser(userId),
    onSuccess() {
      queryClient.invalidateQueries("users");
    },
  })

  return (
    <Flex direction="column" gap="4">
      <Heading>Usuários</Heading>
      <Flex>
        <Button colorScheme='brand'>Adicionar usúarios</Button>
      </Flex>
      <VStack width="full">
        {users?.map(user => (<LinkBox width="full">
          <Card padding="4" display="flex" flexDirection='row' justifyContent="space-between" width="full">
            <Flex flexDirection="column" gap="1">
              <CardHeader padding="0" display="flex" gap="4">
                <LinkOverlay href="#">
                  <Heading fontSize="md">{user.email} </Heading>

                </LinkOverlay>

              </CardHeader>
              <CardBody
                display="flex"
                gap="2"
                alignItems="center"
                padding="0"
                justifyContent="space-between"
              >
                <Text fontSize="sm">{user.role} </Text>
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
                onClick={() => inactiveUser.mutate(user.id)}
              />
            </HStack>
          </Card>
        </LinkBox>))}

      </VStack>
    </Flex>
  );
}
