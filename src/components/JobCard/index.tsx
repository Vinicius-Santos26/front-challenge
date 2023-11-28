import {
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import { IoLocationSharp, IoPeopleSharp } from "react-icons/io5";
import { Job } from "../../types/job";
import { Link } from "react-router-dom";
import { Role } from "../../types/role";

type JobCardProps = {
  job: Job;
  role: Role;
};

export function JobCard(props: JobCardProps) {
  const { job, role } = props;
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
          <LinkOverlay as={Link} to={role === Role.CANDIDATE ? `/dashboard/jobs/${job.id}`: `/dashboard/jobs/recruitment/${job.id}`}>
            <Heading size="md">
              {job.position.name}
              <Flex gap="4" flexWrap="wrap">
                {job.jobSocialVulnerabilities.map((v) => (
                  <Badge key={v.name} colorScheme={v.color}>
                    {v.name}{" "}
                  </Badge>
                ))}
              </Flex>
            </Heading>
            <Text>
              {job.jobLevel.name} - {job.quantity} vaga
            </Text>
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
          <Text>
            {" "}
            {job.addressStreet}, {job.addressNumber} - {job.addressCity},{" "}
            {job.state.name}
          </Text>
        </CardFooter>
      </Card>
    </LinkBox>
  );
}
