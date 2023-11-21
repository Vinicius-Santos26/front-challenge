import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaBuilding } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdComputer, MdWork } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById } from "../../services/jobs";
import { useQuery } from "react-query";
import { CreateApplicationDto } from "../../types/application";
import { useAuth } from "../../hooks/useAuth";
import { createApplication } from "../../services/application";

export function JobDetail() {
  let { jobId } = useParams();
  const navigate = useNavigate();

  const { data: job, isLoading, isFetching} = useQuery({
    queryKey: ["job"],
    queryFn: () => getJobById(jobId!),
    enabled: jobId != undefined,
  });

  const { candidate } = useAuth();
  const toast = useToast();
  
  async function handleCandidatarClick(){
    try {
      const data: CreateApplicationDto = {candidateId: candidate!.id , jobId: jobId!}
      await createApplication(data);
    } catch (error) {
      toast({
        position: 'top-right',
        title: `Erro ao cadastrar`,
        status: 'error',
        isClosable: true,
      });
    }
  }

 
  return (
    <Box minWidth={"container.lg"} marginX="auto">
      {isLoading || isFetching ? (
        <Spinner size="xl" />
      ) : (
        <>
          <Heading as="h3">
            {job!.position.name}
            <HStack spacing="4" my="4">
              {job!.jobSocialVulnerabilities.map((v) => (
                <Badge key={v.name} colorScheme={v.color}>
                  {v.name}
                </Badge>
              ))}
            </HStack>
          </Heading>
          <Flex mt="4" justifyContent="space-between">
            <Flex flexDirection="column" gap="2">
              <Flex alignItems="center" gap="2">
                <Box color="brand.500">
                  <IoLocationSharp size={24} />
                </Box>
                <Text>
                  {job!.addressStreet}, {job!.addressNumber} -{" "}
                  {job!.addressCity}, {job!.state.name}
                </Text>
              </Flex>
              <Flex alignItems="center" gap="2">
                <Box color="brand.500">
                  <MdComputer size={24} />
                </Box>
                <Text>{job!.workModel.name}</Text>
              </Flex>
            </Flex>
            <Flex flexDirection="column" gap="2">
              <Flex alignItems="center" gap="2">
                <Box color="brand.500">
                  <MdWork size={24} />
                </Box>
                <Text>{job!.jobLevel.name}</Text>
              </Flex>
              <Flex alignItems="center" gap="2">
                <Box color="brand.500">
                  <FaBuilding />
                </Box>
                <Text>{job!.company.name}</Text>
              </Flex>
            </Flex>
          </Flex>

          <Divider marginY="6" />
          <Flex flexDirection="column" gap="2">
            <Box>
              <Heading as="h4" fontSize="md">
                DESCRIÇÃO DA VAGA
              </Heading>
              <Text>{job?.description}</Text>
            </Box>
            <Box>
              <Heading as="h4" fontSize="md">
                RESPONSABILIDADES E ATRIBUIÇÕES
              </Heading>
              <Text>{job?.responsabilities}</Text>
            </Box>
            <Box>
              <Heading as="h4" fontSize="md">
                REQUISITOS E QUALIFICAÇÕES
              </Heading>
              <Text>{job?.requirements}</Text>
            </Box>
          </Flex>
          <Flex mt="4" justifyContent="space-between">
            <Button onClick={() => navigate(-1)}>Voltar</Button>
            <Button colorScheme="brand" onClick={handleCandidatarClick}>Candidatar-se</Button>
          </Flex>
        </>
      )}
    </Box>
  );
}
