import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Spinner,
  Textarea,
} from '@chakra-ui/react';

import { Select as MultiSelect } from 'chakra-react-select';
import { useQueries } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { getPositions } from '../../services/positions';
import { useAuth } from '../../hooks/useAuth';
import { Position } from '../../types/position';
import { getJobTypes } from '../../services/jobTypes';
import { JobType } from '../../types/jobType';
import { getJobLevels } from '../../services/jobLevels';
import { WorkModel } from '../../types/workModel';
import { getWorkModels } from '../../services/workModels';
import { JobLevel } from '../../types/jobLevel';
import { getSocialVulnerabilities } from '../../services/socialVulnerabilities';
import { SocialVulnerability } from '../../types/socialVulnerability';
import { RecruitmentFlow } from '../../types/recruitmentFlow';
import { getRecruitmentFlows } from '../../services/recruitmentFlows';
import { getStates } from '../../services/states';
import { State } from '../../types/state';
import { NewJobDto } from '../../types/newJob';
import { createJob } from '../../services/jobs';

export function NewJob() {
  const navigate = useNavigate();

  const { recruiter } = useAuth();

  const queries = useQueries([
    {
      queryKey: ['positions'],
      queryFn: () => getPositions(recruiter!.companyId),
    },
    { queryKey: ['jobTypes'], queryFn: getJobTypes },
    { queryKey: ['jobLevels'], queryFn: getJobLevels },
    { queryKey: ['workModels'], queryFn: getWorkModels },
    {
      queryKey: ['recruitmentFlows'],
      queryFn: () => getRecruitmentFlows(recruiter!.companyId),
    },
    { queryKey: ['socialVulnerabilities'], queryFn: getSocialVulnerabilities },
    { queryKey: ['states'], queryFn: getStates },
  ]);

  const isLoading = queries.some((query) => query.isLoading);

  const [
    positionsQuery,
    jobTypesQuery,
    jobLevelsQuery,
    workModelsQuery,
    recruitmentFlowsQuery,
    socialVulnerabilitiesQuery,
    statesQuery
  ] = queries;

  const positions: Position[] | undefined = positionsQuery.data;
  const jobTypes: JobType[] | undefined = jobTypesQuery.data;
  const jobLevels: JobLevel[] | undefined = jobLevelsQuery.data;
  const workModels: WorkModel[] | undefined = workModelsQuery.data;
  const recruitmentFlows: RecruitmentFlow[] | undefined =
    recruitmentFlowsQuery.data;
  const socialVulnerabilities: SocialVulnerability[] | undefined =
    socialVulnerabilitiesQuery.data;
  const states: State[] | undefined =
    statesQuery.data;

  const validationSchema = z.object({
    qtd: z.preprocess((value) => Number(value), z.number().min(1)),
    position: z.string().nonempty({ message: 'Campo obrigatório' }),
    type: z.string().nonempty({ message: 'Campo obrigatório' }),
    level: z.string().nonempty({ message: 'Campo obrigatório' }),
    workModel: z.string().nonempty({ message: 'Campo obrigatório' }),
    zip:z.string().nonempty({ message: 'Campo obrigatório' }),
    street: z.string().nonempty({ message: 'Campo obrigatório' }),
    number: z.string().nonempty({ message: 'Campo obrigatório' }),
    city: z.string().nonempty({ message: 'Campo obrigatório' }),
    state: z.string().nonempty({ message: 'Campo obrigatório' }),
    salarioDe: z.string(),
    salarioAte: z.string(),
    recruitmentFlow: z.string().nonempty({ message: 'Campo obrigatório' }),
    vulnerabilities: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
          colorScheme: z.string(),
        })
      )
      .min(1, { message: 'Campo obrigatório' }),
    title: z.string().nonempty({ message: 'Campo obrigatório' }),
    description: z.string().nonempty({ message: 'Campo obrigatório' }),
    responsabilities: z.string().nonempty({ message: 'Campo obrigatório' }),
    requirements: z.string().nonempty({ message: 'Campo obrigatório' }),
  });

  type ValidationSchema = z.infer<typeof validationSchema>;

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      salarioDe: '0',
      salarioAte: '0',
      vulnerabilities: []
    },
  });

 async function handleSubmitNovaVaga(vaga: ValidationSchema) {
   
    const newJob : NewJobDto = {
      title: vaga.title,
      description: vaga.description,
      responsabilities: vaga.responsabilities,
      requirements: vaga.requirements,
      companyId: recruiter!.companyId,
      quantity: vaga.qtd,
      salaryMin: Number(vaga.salarioDe),
      salaryMax: Number(vaga.salarioAte),
      positionId: vaga.position,
      jobTypeId: vaga.type,
      jobLevelId: vaga.level,
      workModelId: vaga.workModel,
      recruitmentFlowId: vaga.recruitmentFlow,
      addressZipCode: vaga.zip,
      addressStreet: vaga.street,
      addressNumber: vaga.number,
      addressCity: vaga.city,
      addressStateId: vaga.state,
      vulnerabilities: vaga.vulnerabilities.map((v) => v.value)
    } 
    await createJob(newJob);

    navigate('/dashboard/jobs')
  }
  return (
    <Box>
      <Heading mb="8">Nova vaga</Heading>
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <form onSubmit={handleSubmit(handleSubmitNovaVaga)} noValidate>
          <Flex flexDirection="column" gap="4">
            <FormControl isInvalid={errors.qtd !== undefined}>
              <FormLabel>Quantidade de vagas</FormLabel>
              <NumberInput
                defaultValue={1}
                min={1}
                {...register('qtd')}
                width="fit-content"
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>{errors.qtd?.message}</FormErrorMessage>
            </FormControl>
            <Flex gap="4" alignItems="flex-start">
              <FormControl
                width="auto"
                isInvalid={errors.position !== undefined}
              >
                <FormLabel>Cargo</FormLabel>
                <Select
                  placeholder="Selecione"
                  {...register('position')}
                  width="fit-content"
                >
                  {positions!.map((position) => (
                    <option value={position.id}>{position.name}</option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.position?.message}</FormErrorMessage>
              </FormControl>
              <FormControl width="auto" isInvalid={errors.type !== undefined}>
                <FormLabel>Tipo</FormLabel>
                <Select
                  placeholder="Selecione"
                  width="fit-content"
                  {...register('type')}
                >
                  {jobTypes!.map((type) => (
                    <option value={type.id}>{type.name}</option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
              </FormControl>
              <FormControl width="auto" isInvalid={errors.level !== undefined}>
                <FormLabel>Nivel</FormLabel>
                <Select
                  placeholder="Selecione"
                  width="fit-content"
                  {...register('level')}
                >
                  {jobLevels!.map((level) => (
                    <option value={level.id}>{level.name}</option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.level?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                width="auto"
                isInvalid={errors.workModel !== undefined}
              >
                <FormLabel>Modelo de trabalho</FormLabel>
                <Select
                  placeholder="Selecione"
                  width="fit-content"
                  {...register('workModel')}
                >
                  {workModels!.map((model) => (
                    <option value={model.id}>{model.name}</option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.workModel?.message}</FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex gap="4">
              <FormControl width="auto" isInvalid={errors.zip !== undefined}>
                <FormLabel>CEP</FormLabel>
                <Input {...register('zip')}/>
                <FormErrorMessage>{errors.zip?.message}</FormErrorMessage>
              </FormControl>
              <FormControl width="auto" isInvalid={errors.street !== undefined}>
                <FormLabel>Rua</FormLabel>
                <Input {...register('street')}/>
                <FormErrorMessage>{errors.street?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                width="auto"
                isInvalid={errors.number !== undefined}
              >
                <FormLabel>Número</FormLabel>
                <NumberInput width="auto">
                  <NumberInputField {...register('number')} />
                </NumberInput>
                <FormErrorMessage>{errors.number?.message}</FormErrorMessage>
              </FormControl>
              <FormControl width="auto" isInvalid={errors.city !== undefined}>
                <FormLabel>Cidade</FormLabel>
                <Input {...register('city')}/>
                <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
              </FormControl>
              <FormControl width="auto" isInvalid={errors.state !== undefined}>
                <FormLabel>Estado</FormLabel>
                <Select
                  placeholder="Selecione"
                  width="fit-content"
                  {...register('state')}
                >
                  {states!.map((type) => (
                    <option value={type.id}>{type.name}</option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.state?.message}</FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex gap="4">
              <FormControl
                width="auto"
                isInvalid={errors.salarioDe !== undefined}
              >
                <FormLabel>Salário de</FormLabel>
                <NumberInput width="auto">
                  <NumberInputField {...register('salarioDe')} />
                </NumberInput>
                <FormErrorMessage>{errors.salarioDe?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                width="auto"
                isInvalid={errors.salarioAte !== undefined}
              >
                <FormLabel>Salário até</FormLabel>
                <NumberInput width="auto">
                  <NumberInputField {...register('salarioAte')} />
                </NumberInput>
                <FormErrorMessage>
                  {errors.salarioAte?.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            <FormControl
              width="auto"
              isInvalid={errors.recruitmentFlow !== undefined}
            >
              <FormLabel>Fluxo de recrutamento</FormLabel>
              <Select
                placeholder="Selecione"
                width="fit-content"
                {...register('recruitmentFlow')}
              >
                {recruitmentFlows!.map((job) => (
                  <option value={job.id}>{job.name}</option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.recruitmentFlow?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              width="auto"
              isInvalid={errors.vulnerabilities !== undefined}
            >
              <FormLabel>Vulnerabilidades elegiveis</FormLabel>
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
            <Divider />
            <Heading size="md">Informações para divulgação</Heading>
            <FormControl width="auto" isInvalid={errors.title !== undefined}>
              <FormLabel>Titulo da vaga</FormLabel>
              <Input {...register('title')} />
              <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
              width="auto"
              isInvalid={errors.description !== undefined}
            >
              <FormLabel>Descrição da vaga</FormLabel>
              <Textarea {...register('description')} />
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
              width="auto"
              isInvalid={errors.responsabilities !== undefined}
            >
              <FormLabel>Responsabilidades/atribuições</FormLabel>
              <Textarea {...register('responsabilities')} />
              <FormErrorMessage>
                {errors.responsabilities?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              width="auto"
              isInvalid={errors.requirements !== undefined}
            >
              <FormLabel>Requisitos e qualificações</FormLabel>
              <Textarea {...register('requirements')} />
              <FormErrorMessage>
                {errors.requirements?.message}
              </FormErrorMessage>
            </FormControl>
            <Flex justifyContent="space-between">
              <Button colorScheme="red" as={Link} to="/dashboard/jobs">
                Cancelar
              </Button>
              <Button
                colorScheme="brand"
                isLoading={isSubmitting}
                type="submit"
              >
                Criar vaga
              </Button>
            </Flex>
          </Flex>
        </form>
      )}
    </Box>
  );
}
