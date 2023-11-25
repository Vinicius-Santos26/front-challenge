import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Flex,
  Grid,
  GridItem,
  Heading,
  LinkBox,
  LinkOverlay,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useAuth } from "../../hooks/useAuth";
import { getApplicationsByCandidate } from "../../services/application";
import { Link } from "react-router-dom";

export function Applications() {
  const { candidate } = useAuth();

  const {
    data: applicationsCandidate,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["applicationsCandidate"],
    queryFn: () => getApplicationsByCandidate(candidate!.id),
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
          <Heading marginBottom="4">Aplicações</Heading>
        </Flex>

        <VStack spacing={4} align="stretch">
          {isLoading || isFetching ? (
            <Spinner size="xl" />
          ) : (
            <>
              {applicationsCandidate?.map((application) => (
                <LinkBox>
                  <Card fontWeight="normal" padding="2">
                    <CardHeader padding="0">
                      <Heading size="sm">
                        <LinkOverlay
                          as={Link}
                          to={`/dashboard/applications/${application.id}`}
                          display="flex"
                          gap="4"
                          alignItems="center"
                        >
                          {application.job.position.name} |{" "}
                          {application.job.jobLevel.name} -{" "}
                          {application.job.company.name}
                        </LinkOverlay>
                      </Heading>
                    </CardHeader>
                    <CardBody padding="0">
                      <Text>
                        Etapa atual: {application.recruitmentFlowStep.name}
                      </Text>
                      <Text display="inline-flex" gap="2">
                        Status:
                        <Text color={application.reprovedAt
                            ? "red"
                            : "blue"}>
                          {application.reprovedAt
                            ? "Reprovado"
                            : "Em andamento"}
                        </Text>
                      </Text>
                      <Text>
                        {application.job.addressStreet},{" "}
                        {application.job.addressNumber} -{" "}
                        {application.job.addressCity},{" "}
                        {application.job.state.name}
                      </Text>
                    </CardBody>
                    <CardFooter padding="0">
                      <Text></Text>
                    </CardFooter>
                  </Card>
                </LinkBox>
              ))}
            </>
          )}
        </VStack>
      </GridItem>
    </Grid>
  );
}
