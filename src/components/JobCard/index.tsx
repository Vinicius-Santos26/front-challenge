import {
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import { IoLocationSharp, IoPeopleSharp } from 'react-icons/io5';

export function JobCard() {
  return (
    <LinkBox>
      <Card
        maxWidth="sm"
        padding="4"
        display="flex"
        flexDirection="column"
        gap="2"
      >
        <CardHeader padding="0">
          <LinkOverlay href="#">
            <Heading size="md">
              Product Owner  <Badge colorScheme="purple">PCD</Badge> <Badge colorScheme="green">LGBT</Badge>
            </Heading>
            <Text>Pleno - 1 vaga</Text>
          </LinkOverlay>
        </CardHeader>
        <CardBody display="flex" gap="2" alignItems="center" padding="0">
          <Box color="brand.500">
            <IoPeopleSharp size={24} />
          </Box>

          <Text>3 candidatos</Text>
        </CardBody>
        <CardFooter display="flex" gap="2" alignItems="center" padding="0">
          <Box color="brand.500">
            <IoLocationSharp size={24} />
          </Box>
          <Text>Avenida Paulista - Bela Vista, São Paulo</Text>
        </CardFooter>
      </Card>
    </LinkBox>
  );
}
