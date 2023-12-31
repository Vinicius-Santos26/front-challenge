import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Select as MultiSelect } from 'chakra-react-select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { SignupDto } from '../../types/signup';
import { getSocialVulnerabilities } from '../../services/socialVulnerabilities';
import { useQuery } from 'react-query';

const validationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.date(),
  vulnerabilities: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
        colorScheme: z.string(),
      })
    )
    .min(1, { message: 'Campo obrigatório' }),
  email: z.string().min(1, { message: 'Email é obrigatório' }).email({
    message: 'Email precisa ser válido',
  }),
  password: z
    .string()
    .min(1, { message: 'Senha é obrigatória' })
    .min(8, { message: 'Senha tem que ter no mínimo 8 caracteres' }),
  confirmPassword: z
    .string()
    .min(1, { message: 'Senha é obrigatória' })
    .min(8, { message: 'Senha tem que ter no mínimo 8 caracteres' })
});

type ValidationSchema = z.infer<typeof validationSchema>;

export function Signup() {
  const { onSignUp } = useAuth();

  const { data: socialVulnerabilities, isLoading } = useQuery({
    queryKey: ['socialVulnerabilities'],
    queryFn: () => getSocialVulnerabilities(),
  });

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
      const data: SignupDto = { firstName: formData.firstName, lastName: formData.lastName, email: formData.email, birthDate: formData.birthDate, password: formData.password, vulnerabilities: formData.vulnerabilities.map(v => v.value) }
      await onSignUp(data);
    } catch (error) {
      toast({
        position: 'top-right',
        title: `Erro ao cadastrar`,
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
        width="container.sm"
      >
        <Heading fontWeight="normal" fontSize="3xl">
          Crie seu perfil gratuitamente
        </Heading>
        <Text>Conquiste o seu próximo emprego agora!</Text>
        {isLoading ? (<Spinner size="xl" />) : (<form onSubmit={handleSubmit(handleSubmitNovaVaga)} noValidate>
          <Flex flexDirection="column" gap="4">
            <FormControl isInvalid={errors.firstName !== undefined}>
              <FormLabel>Nome</FormLabel>
              <Input type="text" {...register('firstName')} />
              <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.lastName !== undefined}>
              <FormLabel>Sobrenome</FormLabel>
              <Input type="text" {...register('lastName')} />
              <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email !== undefined}>
              <FormLabel>Data de nascimento</FormLabel>
              <Controller
                name="birthDate"
                control={control}
                render={({ field }) => (
                  <SingleDatepicker
                    configs={{
                      dateFormat: 'dd/MM/yyyy'
                    }}
                    propsConfigs={{
                      dayOfMonthBtnProps: {
                        defaultBtnProps: {
                          _hover: {
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
            <FormControl
              width="auto"
              isInvalid={errors.vulnerabilities !== undefined}
            >
              <FormLabel>Vulnerabilidades</FormLabel>
              <Controller
                control={control}
                name="vulnerabilities"
                render={({ field }) => (
                  <MultiSelect
                    isMulti
                    options={socialVulnerabilities!.map((social) => ({
                      label: social.name,
                      value: social.id,
                      colorScheme: social.color,
                    }))}
                    placeholder="Selecione"
                    value={field.value}
                    onChange={field.onChange}
                    ref={(elm) => field.ref(elm)}
                  />
                )}
              />

              <FormErrorMessage>
                {errors.vulnerabilities?.message}
              </FormErrorMessage>
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
            <FormControl isInvalid={errors.confirmPassword !== undefined}>
              <FormLabel>Confirmar a senha</FormLabel>
              <Input type="password"  {...register('confirmPassword')} />
              <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
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
        </form >)
        }

      </Flex >
    </Flex >
  );
}
