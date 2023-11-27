import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { JobItem } from "../../components/JobItem";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getJobsByCandidate, getJobsByCompany } from "../../services/jobs";
import { useAuth } from "../../hooks/useAuth";
import { Role } from "../../types/role";

export function Jobs() {
  const { recruiter, candidate, role } = useAuth();

  const {
    data: jobs,
    isLoading: isLoadingJobsCompany,
    isFetching: isFetchingJobsCompany,
  } = useQuery({
    queryKey: ["jobs"],
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

  return (
    <Grid
      templateAreas={`"filters vagas"`}
      gridTemplateColumns={"250px 1fr"}
      minH="full"
      gap="4"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem area={"filters"} boxShadow="">
        <Flex justifyContent="space-between" mb="4" mt="12">
          <Heading size="md">Filtros</Heading>
          <Button colorScheme="brand" variant="link">
            Redefinir filtros
          </Button>
        </Flex>
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                País
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <CheckboxGroup>
                <Stack direction="column">
                  <Checkbox value="1">Brasil</Checkbox>
                </Stack>
              </CheckboxGroup>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Estados (UF)
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <CheckboxGroup>
                <Stack direction="column">
                  <Checkbox value="1">SP</Checkbox>
                  <Checkbox value="2">RJ</Checkbox>
                  <Checkbox value="3">ES</Checkbox>
                </Stack>
              </CheckboxGroup>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Cidades
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <CheckboxGroup>
                <Stack direction="column">
                  <Checkbox value="1">Osasco</Checkbox>
                  <Checkbox value="2">São Paulo</Checkbox>
                  <Checkbox value="3">Rio de Janeiro</Checkbox>
                </Stack>
              </CheckboxGroup>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Nível da vaga
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <CheckboxGroup>
                <Stack direction="column">
                  <Checkbox value="1">Pleno</Checkbox>
                  <Checkbox value="2">Senior</Checkbox>
                  <Checkbox value="3">Junior</Checkbox>
                </Stack>
              </CheckboxGroup>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </GridItem>
      <GridItem area={"vagas"}>
        <Flex justifyContent="space-between">
          <Heading marginBottom="4">Vagas</Heading>
          {role === Role.RECRUITER && (
            <Button
              as={Link}
              to="/dashboard/jobs/new"
              bgColor="brand.500"
              color="white"
            >
              Nova vaga
            </Button>
          )}
        </Flex>

        <VStack spacing={4} align="stretch">
          {role === Role.RECRUITER &&
            (isLoadingJobsCompany || isFetchingJobsCompany ? (
              <Spinner size="lg" />
            ) : (
              <>
                {jobs?.map((job) => (
                  <JobItem key={job.id} job={job} role={role} />
                ))}
              </>
            ))}

          {role === Role.CANDIDATE &&
            (isLoadingJobsCandidate || isFetchingJobsCandidate ? (
              <Spinner size="lg" />
            ) : (
              <>
                {jobsCandidate?.map((job) => (
                  <JobItem key={job.id} job={job} role={role} />
                ))}
              </>
            ))}
        </VStack>
      </GridItem>
    </Grid>
  );
}
