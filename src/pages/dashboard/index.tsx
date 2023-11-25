import {
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Link as ChakraLink,
  Wrap,
  Card,
  CardHeader,
  CardFooter,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Role } from "../../types/role";
import { JobCard } from "../../components/JobCard";
import { useQuery } from "react-query";
import { getJobsByCandidate, getJobsByCompany } from "../../services/jobs";
import { getApplicationsByCandidate } from "../../services/application";

export function Dashboard() {
  const { role, recruiter, candidate } = useAuth();

  const {
    data: jobsCompany,
    isLoading: isLoadingJobsCompany,
    isFetching: isFetchingJobsCompany,
  } = useQuery({
    queryKey: ["jobsCompany"],
    queryFn: () => getJobsByCompany(recruiter!.companyId),
    enabled: recruiter != undefined,
  });

  const {
    data: jobsCandidate,
    isLoading: isLoadingJobsCandidate,
    isFetching: isFetchingJobsCandidate,
  } = useQuery({
    queryKey: ["jobsCandidate"],
    queryFn: () => getJobsByCandidate(candidate!.id),
    enabled: candidate != undefined,
  });

  const {
    data: applicationsCandidate,
    isLoading: isLoadingApplicationsCandidate,
    isFetching: isFetchingApplicationsCandidate,
  } = useQuery({
    queryKey: ["applicationsCandidate"],
    queryFn: () => getApplicationsByCandidate(candidate!.id),
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
          <Flex gap="8" justifyContent="center" alignItems="center">
            <LinkBox
              as="article"
              maxW="sm"
              p="8"
              borderWidth="1px"
              rounded="md"
            >
              <LinkOverlay as={Link} to="/dashboard/recruitment-flows">
                Gerenciar fluxos de recrutamento
              </LinkOverlay>
            </LinkBox>
            <LinkBox
              as="article"
              maxW="sm"
              p="8"
              borderWidth="1px"
              rounded="md"
            >
              <LinkOverlay as={Link} to="/dashboard/positions">
                Gerenciar cargos
              </LinkOverlay>
            </LinkBox>
            <LinkBox
              as="article"
              maxW="sm"
              p="8"
              borderWidth="1px"
              rounded="md"
            >
              <LinkOverlay as={Link} to="/dashboard/jobs/new">
                Nova vaga
              </LinkOverlay>
            </LinkBox>
          </Flex>
          <Heading as="h3">
            Acompanhe aqui as últimas vagas de sua empresa!
          </Heading>
          <Wrap direction="row" spacing="4">
            {isLoadingJobsCompany || isFetchingJobsCompany ? (
              <Spinner size="md" />
            ) : (
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
              {isLoadingJobsCandidate || isFetchingJobsCandidate ? (
                <Spinner size="md" />
              ) : (
                <>
                  {jobsCandidate?.slice(0, 3).map((job) => (
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
          </Flex>
          <Flex flexDirection="column" gap="2">
            <Heading as="h3">Aplicações</Heading>
            <Wrap direction="row" spacing="4" flex="1">
              {isLoadingApplicationsCandidate ||
              isFetchingApplicationsCandidate ? (
                <Spinner size="md" />
              ) : (
                <>
                  {applicationsCandidate?.slice(0, 3).map((application) => (
                    <LinkBox key={application.id}>
                      <Card
                        maxWidth="sm"
                        padding="4"
                        display="flex"
                        flexDirection="column"
                        gap="2"
                      >
                        <CardHeader padding="0">
                          <LinkOverlay
                            as={Link}
                            to={`/dashboard/applications/${application.id}`}
                          >
                            <Heading size="md">
                              {application.job.position.name}
                            </Heading>
                            <Text>
                              {application.job.jobLevel.name} -{" "}
                              {application.job.company.name}
                            </Text>
                          </LinkOverlay>
                        </CardHeader>
                        <CardFooter
                          flexDirection="column"
                          display="flex"
                          gap="2"
                          padding="0"
                        >
                          <Text>
                            Etapa atual: {application.recruitmentFlowStep.name}
                          </Text>
                          <Text display="inline-flex" gap="2">
                            Status:
                            <Text
                              color={application.reprovedAt ? "red" : "blue"}
                            >
                              {application.reprovedAt
                                ? "Reprovado"
                                : "Em andamento"}
                            </Text>
                          </Text>
                        </CardFooter>
                      </Card>
                    </LinkBox>
                  ))}
                </>
              )}
            </Wrap>
            <Flex justifyContent="center">
              <LinkBox>
                <ChakraLink
                  as={Link}
                  to="/dashboard/applications"
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
