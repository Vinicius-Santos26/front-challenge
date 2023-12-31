import { Company } from "./company";
import { JobLevel } from "./jobLevel";
import { Position } from "./position";
import { RecruitmentFlow } from "./recruitmentFlow";
import { SocialVulnerability } from "./socialVulnerability";
import { State } from "./state";
import { WorkModel } from "./workModel";

export type Job = {
  id: string;
  quantity: number;
  addressStreet: string;
  addressNumber: string;
  addressCity: string;
  addressStateId: string;
  createdAt: Date;
  position: Position;
  jobLevel: JobLevel;
  jobSocialVulnerabilities: SocialVulnerability[];
  state: State;
  description: string;
  responsabilities: string;
  requirements: string;
  company: Company;
  workModel: WorkModel;
  recruitmentFlow: RecruitmentFlow;
}