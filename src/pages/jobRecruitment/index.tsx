import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBuilding } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdComputer, MdWork } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getJobById } from "../../services/jobs";
import {
  getApplicationsByJob,
  updateApplication,
} from "../../services/application";
import { useEffect, useState } from "react";
import { RecruitmentFlowStep } from "../../types/recruitmentFlowStep";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Application, UpdateApplicationDto } from "../../types/application";
import { format, parseISO } from "date-fns";

const schemaStepChange = z.object({
  stepId: z.string().nonempty(),
});

type SchemaStepChange = z.infer<typeof schemaStepChange>;

const schemaReprove = z.object({
  feedback: z.string().nonempty(),
});

type SchemaReprove = z.infer<typeof schemaReprove>;

export function JobRecruitment() {
  const {
    handleSubmit: handleSubmitStepChange,
    register: registerStepChange,
    setValue: setValueStepChange,
  } = useForm<SchemaStepChange>({
    resolver: zodResolver(schemaStepChange),
  });

  const { handleSubmit: handleSubmitReprove, register: registerReprove } =
    useForm<SchemaReprove>({
      resolver: zodResolver(schemaReprove),
    });

  let { jobId } = useParams();
  const navigate = useNavigate();

  const {
    data: job,
    isLoading: isLoadingJob,
    isFetching: isFetchingJob,
  } = useQuery({
    queryKey: ["job"],
    queryFn: () => getJobById(jobId!),
    enabled: jobId != undefined,
  });

  const {
    data: applications,
    isLoading: isLoadingApplications,
    isFetching: isFetchingApplications,
    refetch: refetchApplications,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: () => getApplicationsByJob(jobId!),
    enabled: jobId != undefined,
  });

  const {
    isOpen: isOpenModalEdicao,
    onOpen: onOpenModalEdicao,
    onClose: onCloseModalEdicao,
  } = useDisclosure();
  const {
    isOpen: isOpenModalReprovacao,
    onOpen: onOpenModalReprovacao,
    onClose: onCloseModalReprovacao,
  } = useDisclosure();

  const [application, setApplication] = useState<Application | null>(null);
  const [steps, setSteps] = useState<RecruitmentFlowStep[]>([]);

  useEffect(() => {
    if(job)
      setSteps(job.recruitmentFlow.recruitmentFlowSteps);
  }, [job]);

  function handleOpenModalEdicao(app: Application) {
    setApplication(app);
    setValueStepChange("stepId", app.currentStepId);
    onOpenModalEdicao();
  }

  function handleOpenModalReprovacao(app: Application) {
    setApplication(app);
    onOpenModalReprovacao();
  }

  async function updateStepChange(data: SchemaStepChange) {
    if (application?.currentStepId != data.stepId) {
      const upd: UpdateApplicationDto = {
        currentStepId: data.stepId,
        feedback: undefined,
        reprovedAt: undefined,
      };
      await updateApplication(upd, application!.id);
      refetchApplications();
    }
    onCloseModalEdicao();
  }

  async function reprove(data: SchemaReprove) {
    const upd: UpdateApplicationDto = {
      currentStepId: undefined,
      feedback: data.feedback,
      reprovedAt: new Date(),
    };
    await updateApplication(upd, application!.id);
    refetchApplications();
    onCloseModalReprovacao();
  }
  return (
    <Box
      minWidth={"container.lg"}
      marginX="auto"
      display="flex"
      flexDirection="column"
    >
      {isLoadingJob ||
      isFetchingJob ||
      isLoadingApplications ||
      isFetchingApplications ? (
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
          <VStack alignItems="left">
            {applications?.length === 0 && <Text>Nenhuma aplicação na vaga</Text>}
            {applications?.map((app) => (
              <Card fontWeight="normal" padding="2" width="md">
                <CardHeader padding="1">
                  <Heading
                    size="sm"
                    display="inline-flex"
                    gap="2"
                    alignItems="center"
                  >
                    {`${app.candidate.firstName} ${app.candidate.lastName}`}
                    <HStack spacing="4">
                      {app.candidate.candidateSocialVulnerabilities.map((v) => (
                        <Badge
                          key={v.socialVulnerability.name}
                          colorScheme={v.socialVulnerability.color}
                        >
                          {v.socialVulnerability.name}
                        </Badge>
                      ))}
                    </HStack>
                  </Heading>
                </CardHeader>
                <CardBody padding="1">
                  <Text>Etapa: {app.recruitmentFlowStep.name}</Text>
                </CardBody>
                <CardFooter
                  padding="1"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap="4"
                >
                  <Button size="sm" colorScheme="brand">
                    Ver detalhes
                  </Button>

                  {app.reprovedAt ? (
                    <Text size="sm"> Reprovado em {format(parseISO(app!.reprovedAt.toString()), 'dd/MM/yyyy')} </Text>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={() => handleOpenModalEdicao(app)}
                      >
                        Editar etapa
                      </Button>

                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleOpenModalReprovacao(app)}
                      >
                        Reprovar
                      </Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            ))}
          </VStack>

          <Flex mt="4">
            <Button onClick={() => navigate(-1)}>Voltar</Button>
          </Flex>
        </>
      )}

      <Modal isOpen={isOpenModalEdicao} onClose={onCloseModalEdicao}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar etapa</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" gap="4">
            <FormControl width="auto">
              <FormLabel>Etapa</FormLabel>
              <Select width="fit-content" {...registerStepChange("stepId")}>
                {steps!.map((step) => (
                  <option value={step.id}>{step.name}</option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter display="flex" justifyContent="space-between">
            <Button mr={3} onClick={onCloseModalEdicao}>
              Voltar
            </Button>
            <Button
              colorScheme="brand"
              onClick={handleSubmitStepChange(updateStepChange)}
            >
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenModalReprovacao} onClose={onCloseModalReprovacao}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reprovar candidato</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" gap="4">
            <FormControl width="auto">
              <FormLabel>Feedback</FormLabel>
              <Textarea {...registerReprove("feedback")} />
            </FormControl>
          </ModalBody>

          <ModalFooter display="flex" justifyContent="space-between">
            <Button mr={3} onClick={onCloseModalReprovacao}>
              Voltar
            </Button>
            <Button colorScheme="brand" onClick={handleSubmitReprove(reprove)}>
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
