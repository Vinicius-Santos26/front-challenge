import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';


const validationSchema = z.object({
  email: z.string().min(1, { message: "Email é obrigatório" }).email({
    message: "Email precisa ser válido",
  }),
  password: z
    .string()
    .min(1, { message: "Senha é obrigatória" })
    .min(8, { message: "Senha tem que ter no mínimo 8 caracteres"})
});

type ValidationSchema = z.infer<typeof validationSchema>;


export function Signin() {
  const { onLogin } = useAuth();
  const toast = useToast()

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  async function handleSubmitNovaVaga(formData: ValidationSchema) {
    try {
      await onLogin(formData);
    } catch (error) {
      toast({
        position: 'top-right',
        title: `Email ou senha inválidos`,
        status: 'error',
        isClosable: true,
      })
      setError("email", { message: "" } );
      setError("password", { message: "" });
    }
    
  }

  return (
    <Flex
      direction="column"
      bgColor="gray.100"
      minWidth="full"
      flex="1"
      justifyContent="center"
      alignItems="center"
    >
      <Flex direction="column" bgColor="white" p="8" textAlign="center" gap="4" rounded="md">
        <Heading fontWeight="normal" fontSize="3xl">
          Entre no seu perfil
        </Heading>
        <Text>Bem-vindo(a) de volta ao Everymind Recruitment</Text>
        <form onSubmit={handleSubmit(handleSubmitNovaVaga)} noValidate>
          <Flex flexDirection="column" gap="4">
            <FormControl isInvalid={errors.email !== undefined}>
              <FormLabel>Email</FormLabel>
              <Input type="email" {...register("email")} />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password !== undefined}>
              <FormLabel>Senha</FormLabel>
              <Input type="password" {...register("password")}/>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <Button mt={4} colorScheme="brand" type="submit" isLoading={isSubmitting}>
              Entrar
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
}
