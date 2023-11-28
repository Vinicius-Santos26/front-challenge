import {
  Button,
  Card,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  LinkBox,
  LinkOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useAuth } from "../../hooks/useAuth";
import { createPosition, getPositions } from "../../services/positions";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePositionDto } from "../../types/position";

const schemaNewPosition = z.object({
  name: z.string().nonempty(),
});

type SchemaNewPosition = z.infer<typeof schemaNewPosition>;

export function Positions() {
  const { recruiter } = useAuth();

  const { data: positions, refetch } = useQuery({
    queryKey: ["positions"],
    queryFn: () => getPositions(recruiter!.companyId),
    enabled: recruiter != null,
  });

  const {
    handleSubmit: handleSubmitNewPosition,
    register: registerNewPosition,
    setValue: setValueNewPosition,
  } = useForm<SchemaNewPosition>({
    resolver: zodResolver(schemaNewPosition),
  });

  const { isOpen, onOpen, onClose } = useDisclosure();


  function closeModal(){
    setValueNewPosition("name", "");
    onClose();
  }

  async function handleNewPosition(data: SchemaNewPosition) {
    const position : CreatePositionDto = {name: data.name, companyId: recruiter!.companyId};


    await createPosition(position);
    setValueNewPosition("name", "");
    onClose();
    refetch();
  }

  return (
    <Flex direction="column" gap="4">
      <Heading>Cargos</Heading>
      <Flex>
        <Button colorScheme="brand" onClick={onOpen}>Adicionar cargo</Button>
      </Flex>
      <VStack width="full">
        {positions?.map((position) => (
          <LinkBox width="full">
            <Card
              padding="4"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              width="full"
            >
              <CardHeader padding="0" display="flex" gap="4">
                <LinkOverlay href="#">
                  <Heading fontSize="md">{position.name} </Heading>
                </LinkOverlay>
              </CardHeader>
            </Card>
          </LinkBox>
        ))}
      </VStack>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Novo Cargo</ModalHeader>
          <ModalCloseButton />

          <ModalBody display="flex" flexDirection="column" gap="4">
            <FormControl width="auto">
              <FormLabel>Nome</FormLabel>
              <Input {...registerNewPosition("name")} />
            </FormControl>
          </ModalBody>

          <ModalFooter display='flex' justifyContent='space-between'>
              <Button colorScheme="red" mr={3} onClick={closeModal}>
                Voltar
              </Button>
              <Button
                colorScheme="brand"
                onClick={handleSubmitNewPosition(
                  handleNewPosition
                )}
              >
                Salvar
              </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
