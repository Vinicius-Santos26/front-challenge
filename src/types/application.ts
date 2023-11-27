import { Candidate } from "./candidate";
import { Job } from "./job";
import { RecruitmentFlowStep } from "./recruitmentFlowStep";

export type CreateApplicationDto = {
  jobId: string;
  candidateId: string;
};

export type Application = {
  id: string;
  jobId: string;
  candidateId: string;
  currentStepId: string;
  appliedAt: Date;
  reprovedAt: Date;
  feedback: string;
  job: Job;
  recruitmentFlowStep : RecruitmentFlowStep;
  candidate: Candidate;
};


export type UpdateApplicationDto = {
  currentStepId: string | undefined;
  feedback: string | undefined;
  reprovedAt: Date | undefined;
}