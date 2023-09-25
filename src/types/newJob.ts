export type NewJobDto  = {
  title: string;
  description: string;
  responsabilities: string;
  requirements: string;
  companyId: string;
  quantity: number;
  salaryMin: number;
  salaryMax: number;
  positionId: string;
  jobTypeId: string;
  jobLevelId: string;
  workModelId: string;
  recruitmentFlowId: string;
  addressZipCode: string;
  addressStreet: string;
  addressNumber: string;
  addressCity: string;
  addressStateId: string;
  vulnerabilities: string[];
}