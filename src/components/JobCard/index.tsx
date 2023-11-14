import {
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import { IoLocationSharp, IoPeopleSharp } from 'react-icons/io5';
import { Job } from '../../types/job';

type JobCardProps = {
  job: Job;
};

export function JobCard(props: JobCardProps) {
  const { job } = props;
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
              {job.position.name}
              <HStack spacing="4">
                {job.jobSocialVulnerabilities.map((v) => (
                  <Badge key={v.name} colorScheme={v.color}>{v.name} </Badge>
                ))}
              </HStack>
            </Heading>
            <Text>{job.jobLevel.name}  -  {job.quantity} vaga</Text>
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
          <Text> {job.addressStreet}, {job.addressNumber} - {job.addressCity},{' '}
            {job.state.name}</Text>
        </CardFooter>
      </Card>
    </LinkBox>
  );
}
