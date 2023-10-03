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
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';

const validationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.date(),
  email: z.string().min(1, { message: 'Email é obrigatório' }).email({
    message: 'Email precisa ser válido',
  }),
  password: z
    .string()
    .min(1, { message: 'Senha é obrigatória' })
    .min(8, { message: 'Senha tem que ter no mínimo 8 caracteres' })
    .regex(/^(?=.*[a-z])/, {message: 'Pelo menos um caracter minusculo'})
});

type ValidationSchema = z.infer<typeof validationSchema>;

export function Signup() {
  const { onLogin } = useAuth();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    setError,
    control,
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
      });
      setError('email', { message: '' });
      setError('password', { message: '' });
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
      <Flex
        direction="column"
        bgColor="white"
        p="8"
        textAlign="center"
        gap="4"
        rounded="md"
      >
        <Heading fontWeight="normal" fontSize="3xl">
          Crie seu perfil gratuitamente
        </Heading>
        <Text>Conquiste o seu próximo emprego agora!</Text>
        <form onSubmit={handleSubmit(handleSubmitNovaVaga)} noValidate>
          <Flex flexDirection="column" gap="4">
            <FormControl isInvalid={errors.email !== undefined}>
              <FormLabel>Nome</FormLabel>
              <Input type="text" {...register('email')} />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email !== undefined}>
              <FormLabel>Sobrenome</FormLabel>
              <Input type="text" {...register('email')} />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email !== undefined}>
              <FormLabel>Data de nascimento</FormLabel>
              <Controller 
                name="birthDate"
                control={control}
                render={({field}) => (
                <SingleDatepicker
                  configs={{
                    dateFormat: 'dd/MM/yyyy'
                  }}
                  propsConfigs={{
                    dayOfMonthBtnProps: {
                      defaultBtnProps: {
                        _hover:{
                          background: "brand.500"
                        }
                      },
                      selectedBtnProps: {
                        backgroundColor: 'brand.500'
                      },
                    }
                  }}
                  name="date-input"
                  date={field.value}
                  onDateChange={(date) => field.onChange(date)}
                />)}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email !== undefined}>
              <FormLabel>Email</FormLabel>
              <Input type="email" {...register('email')} />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password !== undefined}>
              <FormLabel>Senha</FormLabel>
              <Input type="password" {...register('password')} />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password !== undefined}>
              <FormLabel>Confirmar a senha</FormLabel>
              <Input type="password"  />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <Button
              mt={4}
              colorScheme="brand"
              type="submit"
              isLoading={isSubmitting}
            >
              Entrar
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
}
