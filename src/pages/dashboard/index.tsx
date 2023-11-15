import { Flex, Heading, LinkBox, LinkOverlay, Link as ChakraLink, Wrap } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Role } from "../../types/role";
import { JobCard } from "../../components/JobCard";
import { useQuery } from "react-query";
import { getJobsByCandidate, getJobsByCompany } from "../../services/jobs";

export function Dashboard() {
  const { role, recruiter, candidate } = useAuth();

  const { data: jobsCompany } = useQuery({
    queryKey: ["jobsCompany"],
    queryFn: () => getJobsByCompany(recruiter!.companyId),
    enabled: recruiter != undefined,
  });

  const { data: jobsCandidate } = useQuery({
    queryKey: ["jobsCandidate"],
    queryFn: () => getJobsByCandidate(candidate!.id),
    enabled: candidate != undefined,
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

      {role === Role.RECRUITER && (
        <>
          <Heading as="h3">
            Acompanhe aqui as últimas vagas de sua empresa!
          </Heading>
          <Wrap direction="row" spacing="4">
            {role === Role.RECRUITER && (
              <>
                {jobsCompany?.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </>
            )}
          </Wrap>
          <Flex justifyContent="center">
            <ChakraLink
              as={Link}
              to="/dashboard/jobs"
              color="brand.500"
              fontWeight="bold"
            >
              VER TODAS AS VAGAS
            </ChakraLink>
          </Flex>
        </>
      )}

      {role === Role.CANDIDATE && (
        <>
          <Flex flexDirection="column" gap="2">
            <Heading as="h3">Vagas</Heading>
            <Wrap direction="row" spacing="4" flex="1">
              {jobsCandidate?.slice(0, 3).map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </Wrap>
            <Flex justifyContent="center">
              <ChakraLink
                as={Link}
                to="/dashboard/jobs"
                color="brand.500"
                fontWeight="bold"
              >
                VER TODAS AS VAGAS
              </ChakraLink>
            </Flex>
          </Flex>
          <Flex flexDirection="column" gap="2">
            <Heading as="h3">Aplicações</Heading>
            <Wrap direction="row" spacing="4" flex="1">
              {jobsCandidate?.slice(0, 3).map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </Wrap>
            <Flex justifyContent="center">
              <LinkBox>
                <ChakraLink
                  as={Link}
                  to="/dashboard/jobs"
                  color="brand.500"
                  fontWeight="bold"
                >
                  VER TODAS AS APLICAÇÕES
                </ChakraLink>
              </LinkBox>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
}
