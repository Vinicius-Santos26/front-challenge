import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Input,
  LinkOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { DndContext, closestCenter } from "@dnd-kit/core";

import StepLane from "../../components/StepLane";
import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createRecruitmentFlow,
  getRecruitmentFlows,
} from "../../services/recruitmentFlows";
import { useQuery } from "react-query";
import { useAuth } from "../../hooks/useAuth";
import { CreateRecruitmentFlowDto } from "../../types/recruitmentFlow";

const schemaNewStep = z.object({
  stepName: z.string().nonempty(),
});

type SchemaNewStep = z.infer<typeof schemaNewStep>;

const schemaNewRecruitmentFlow = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
});

type SchemaNewRecruitmentFlow = z.infer<typeof schemaNewRecruitmentFlow>;

const defaultSteps = ["Inscrição", "Testes", "Entrevista", "Devolutiva"];

export function RecruitmentFlows() {
  const { recruiter } = useAuth();

  const {
    data: recruitmentFlows,
    refetch,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["recruitmentFlows"],
    queryFn: () => getRecruitmentFlows(recruiter!.companyId),
    enabled: recruiter != undefined,
  });

  const {
    handleSubmit: handleSubmitNewStep,
    register: registerNewStep,
    setValue: setValueNewStep,
  } = useForm<SchemaNewStep>({
    resolver: zodResolver(schemaNewStep),
  });

  const {
    handleSubmit: handleSubmitNewRecruitmentFlow,
    register: registerNewRecruitmentFlow,
    setValue: setValueNewRecruitmentFlow,
  } = useForm<SchemaNewRecruitmentFlow>({
    resolver: zodResolver(schemaNewRecruitmentFlow),
  });

  const [steps, setSteps] = useState<Array<string>>(defaultSteps);

  const addNewStep = (data: SchemaNewStep) => {
    setSteps([...steps, data.stepName]);
    setValueNewStep("stepName", "");
  };

  function handleDragEnd(event: { active: any; over: any }) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSteps((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);

        return arrayMove(items, activeIndex, overIndex);
      });
    }
  }

  async function handleNewRecruitmentFlow(data: SchemaNewRecruitmentFlow) {
    const newRecruitmentFlow: CreateRecruitmentFlowDto = {
      name: data.name,
      description: data.description,
      recruitmentFlowSteps: steps,
      companyId: recruiter!.companyId,
    };

    await createRecruitmentFlow(newRecruitmentFlow);

    setSteps(defaultSteps);
    setValueNewRecruitmentFlow("name", "");
    setValueNewRecruitmentFlow("description", "");
    setValueNewStep("stepName", "");
    onClose();
    refetch();
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  function closeModal(){
    setSteps(defaultSteps);
    setValueNewRecruitmentFlow("name", "");
    setValueNewRecruitmentFlow("description", "");
    setValueNewStep("stepName", "");
    onClose();
  }

  return (
    <Flex direction="column" gap="4">
      <Heading>Fluxos de recrutamento</Heading>
      <Flex>
        <Button colorScheme="brand" onClick={onOpen}>
          Adicionar novo fluxo
        </Button>
      </Flex>
      <VStack width="full">
        {isLoading || isFetching ? (
          <Spinner size="lg" />
        ) : (
          recruitmentFlows?.map((flow) => (
            <Card
              padding="4"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              width="full"
            >
              <Flex flexDirection="column" gap="1">
                <CardHeader padding="0" display="flex" gap="4">
                  <LinkOverlay href="#">
                    <Heading fontSize="md">{flow.name} </Heading>
                  </LinkOverlay>
                </CardHeader>
                <CardBody
                  flexDirection="column"
                  display="flex"
                  gap="2"
                  padding="0"
                  justifyContent="space-between"
                >
                  <Text fontSize="sm">{flow.description} </Text>
                  <Text fontSize="sm">
                    Etapas:
                    {flow.recruitmentFlowSteps
                      .map((x) => x.name)
                      .reduce((a, b) => a + " - " + b)}
                  </Text>
                </CardBody>
              </Flex>

              <HStack spacing="8">
                <IconButton
                  colorScheme="blue"
                  aria-label="edit"
                  size="md"
                  icon={<FaEdit />}
                />
                <IconButton
                  colorScheme="red"
                  aria-label="inactive"
                  size="md"
                  icon={<FaTrash />}
                  onClick={() => {}}
                />
              </HStack>
            </Card>
          ))
        )}
      </VStack>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Novo Fluxo de Recrutamento</ModalHeader>
          <ModalCloseButton />
          <form>
            <ModalBody display="flex" flexDirection="column" gap="4">
              <FormControl width="auto">
                <FormLabel>Nome</FormLabel>
                <Input {...registerNewRecruitmentFlow("name")} />
              </FormControl>
              <FormControl width="auto">
                <FormLabel>Descrição</FormLabel>
                <Textarea {...registerNewRecruitmentFlow("description")} />
              </FormControl>

              <FormControl width="auto" mt="2">
                <FormLabel>Etapas</FormLabel>
                <Flex
                  justifyContent="space-between"
                  gap="4"
                  alignItems="center"
                >
                  <Input
                    placeholder="Nova etapa"
                    {...registerNewStep("stepName")}
                  />
                  <Button
                    size="sm"
                    width="100%"
                    onClick={handleSubmitNewStep(addNewStep)}
                  >
                    Adicionar Etapa
                  </Button>
                </Flex>
                <DndContext
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <Flex flexDirection="column">
                    <Flex flex="3">
                      <StepLane title="Etapa" items={steps} />
                    </Flex>
                  </Flex>
                </DndContext>
              </FormControl>
            </ModalBody>

            <ModalFooter display='flex' justifyContent='space-between'>
              <Button colorScheme="red" mr={3} onClick={closeModal}>
                Voltar
              </Button>
              <Button
                colorScheme="brand"
                onClick={handleSubmitNewRecruitmentFlow(
                  handleNewRecruitmentFlow
                )}
              >
                Salvar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
