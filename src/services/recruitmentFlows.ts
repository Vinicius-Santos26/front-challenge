import {
  CreateRecruitmentFlowDto,
  RecruitmentFlow,
} from "../types/recruitmentFlow";
import api from "./api";

export async function getRecruitmentFlows(
  companyId: string
): Promise<RecruitmentFlow[]> {
  const { data } = await api.get("recruitment-flows", {
    params: { companyId },
  });

  return data;
}

export async function createRecruitmentFlow(
  recruitmentFlow: CreateRecruitmentFlowDto
) {
  const { data } = await api.post("recruitment-flows", recruitmentFlow);

  return data;
}
