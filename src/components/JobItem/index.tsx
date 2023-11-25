import {
  Badge,
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
import { Job } from '../../types/job';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

type JobItemProps = {
  job: Job;
};

export function JobItem(props: JobItemProps) {
  const { job } = props;
  return (
    <LinkBox>
      <Card fontWeight="normal" padding="2">
        <CardHeader padding="0">
          <Heading size="sm">
            <LinkOverlay  as={Link} to={`/dashboard/jobs/${job.id}`} display='flex' gap='4' alignItems='center'>
              {job.position.name} | {job.jobLevel.name} - {job.quantity} vaga{' '}
              <HStack spacing="4">
                {job.jobSocialVulnerabilities.map((v) => (
                  <Badge key={v.name} colorScheme={v.color}>{v.name} </Badge>
                ))}
              </HStack>
            </LinkOverlay>
          </Heading>
        </CardHeader>
        <CardBody padding="0">
          <Text>
            {job.addressStreet}, {job.addressNumber} - {job.addressCity},{' '}
            {job.state.name}
          </Text>
        </CardBody>
        <CardFooter padding="0">
          <Text fontSize="small">{format(parseISO(job.createdAt.toString()), 'dd/MM/yyyy')}</Text>
        </CardFooter>
      </Card>
    </LinkBox>
  );
}
