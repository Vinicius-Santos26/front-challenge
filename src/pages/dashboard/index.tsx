import { Flex, Heading, LinkBox, LinkOverlay, Wrap } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../types/role';
import { JobCard } from '../../components/JobCard';
import { useQuery } from 'react-query';
import { getJobsByCompany } from '../../services/jobs';

export function Dashboard() {
  const { role, recruiter } = useAuth();

  const { data: jobs } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => getJobsByCompany(recruiter!.companyId),
    enabled: recruiter != undefined
  });

  return (
    <Flex direction="column" gap="4">
      <Heading>Dashboard</Heading>
      {role === Role.ADMINISTRATOR && (
        <Flex gap="8" justifyContent="center" alignItems="center">
          <LinkBox as="article" maxW="sm" p="8" borderWidth="1px" rounded="md">
            <LinkOverlay as={Link} to="/dashboard/users">
              Gerenciar usuários
            </LinkOverlay>
          </LinkBox>
          <LinkBox as="article" maxW="sm" p="8" borderWidth="1px" rounded="md">
            <LinkOverlay as={Link} to="/dashboard/companies">
              Gerenciar empresas
            </LinkOverlay>
          </LinkBox>
          <LinkBox as="article" maxW="sm" p="8" borderWidth="1px" rounded="md">
            <LinkOverlay as={Link} to="/dashboard/fields">
              Gerenciar campos
            </LinkOverlay>
          </LinkBox>
        </Flex>
      )}

      {role !== Role.ADMINISTRATOR && (
        <>
          <Flex
            height={{ base: '30vh' }}
            minWidth="full"
            justifyContent="center"
            alignItems="center"
            backgroundColor="gray.300"
          >
            <Heading>Carousel - posts</Heading>
          </Flex>
          <Heading as="h3">
            {role === Role.RECRUITER && "Acompanhe aqui as últimas vagas de sua empresa!"}
            {role === Role.CANDIDATE && "Acompanhe aqui as suas aplicações!"}
          </Heading>
          <Wrap direction="row" spacing="4">
            {role === Role.RECRUITER && (<>{console.log("jobs", jobs)}{jobs?.map(job => <JobCard key={job.id} job={job}/>)}</>)}
            {role === Role.CANDIDATE && <></>}
          </Wrap>
          <Flex justifyContent="center">
            <LinkOverlay
              as={Link}
              to="/dashboard/jobs"
              color="brand.500"
              fontWeight="bold"
            >
              VER TODAS AS VAGAS
            </LinkOverlay>
          </Flex>
        </>
      )}
    </Flex>
  );
}
