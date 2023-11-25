import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Spinner,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
} from "@chakra-ui/react";
import { FaBuilding } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdCancel, MdComputer, MdWork } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getApplicationById } from "../../services/application";

export function ApplicationDetail() {
  let { applicationId } = useParams();
  const navigate = useNavigate();

  const {
    data: application,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["application"],
    queryFn: () => getApplicationById(applicationId!),
    enabled: applicationId != undefined,
  });

  return (
    <Box minWidth={"container.lg"} marginX="auto">
      {isLoading || isFetching ? (
        <Spinner size="xl" />
      ) : (
        <>
          <Heading as="h3">
            {application!.job.position.name}
            <HStack spacing="4" my="4">
              {application!.job!.jobSocialVulnerabilities.map((v) => (
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
                  {application!.job!.addressStreet},{" "}
                  {application!.job!.addressNumber} -{" "}
                  {application!.job!.addressCity},{" "}
                  {application!.job!.state.name}
                </Text>
              </Flex>
              <Flex alignItems="center" gap="2">
                <Box color="brand.500">
                  <MdComputer size={24} />
                </Box>
                <Text>{application!.job!.workModel.name}</Text>
              </Flex>
            </Flex>
            <Flex flexDirection="column" gap="2">
              <Flex alignItems="center" gap="2">
                <Box color="brand.500">
                  <MdWork size={24} />
                </Box>
                <Text>{application!.job!.jobLevel.name}</Text>
              </Flex>
              <Flex alignItems="center" gap="2">
                <Box color="brand.500">
                  <FaBuilding />
                </Box>
                <Text>{application!.job!.company.name}</Text>
              </Flex>
            </Flex>
          </Flex>
          {application!.reprovedAt && (
            <Flex mt="4" gap="2" width="100%" border="1px solid black" borderRadius="4" p="2" borderColor="brand.500"><Text>Feedback: </Text><Text>{application!.feedback}</Text></Flex>
          )}

          <Divider marginY="6" />

          <Stepper
            size="md"
            index={Number(application!.recruitmentFlowStep.order) - 1}
            orientation="vertical"
            height="600px"
            gap={4}
          >
            {application!.job.recruitmentFlow.recruitmentFlowSteps.map(
              (recruitmentFlow, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={
                        application!.reprovedAt ? (
                          <Box color="red">
                            <MdCancel />{" "}
                          </Box>
                        ) : (
                          <StepNumber />
                        )
                      }
                    />
                  </StepIndicator>

                  <Box flexShrink="0">
                    <StepTitle>{recruitmentFlow.name}</StepTitle>
                  </Box>

                  <StepSeparator />
                </Step>
              )
            )}
          </Stepper>

          <Flex mt="4">
            <Button onClick={() => navigate(-1)}>Voltar</Button>
          </Flex>
        </>
      )}
    </Box>
  );
}
