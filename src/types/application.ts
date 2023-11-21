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
  feedback: string;
};
