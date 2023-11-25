import { RecruitmentFlowStep } from "./recruitmentFlowStep";

export type RecruitmentFlow = {
  id: string;
  companyId: string;
  name: string;
  description: string;
  recruitmentFlowSteps: RecruitmentFlowStep[];
}