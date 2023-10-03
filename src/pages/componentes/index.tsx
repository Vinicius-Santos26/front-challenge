import { Avatar, Box, Card, CardBody, CardFooter, Flex, Heading, Text } from '@chakra-ui/react';
import { FaClock } from 'react-icons/fa';

export function Componentes() {
  return (
    <Flex direction="column" gap="4">
      <Heading>Componentes</Heading>
      <Card maxWidth="sm">
        <CardBody>
          <Avatar
            name="Kola Tioluwani"
            src="https://bit.ly/tioluwani-kolawole"
          />
          <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
        <CardFooter>
          <Box>
            <FaClock />
            <Text>Texto</Text>
          </Box>
        </CardFooter>
      </Card>
    </Flex>
  );
}
