import { RecruitmentFlow } from "../types/recruitmentFlow";
import api from "./api";

export async function getRecruitmentFlows(companyId:string): Promise<RecruitmentFlow[]> {
  const { data } = await api.get(`recruitment-flows/${companyId}`);

  return data;
}
