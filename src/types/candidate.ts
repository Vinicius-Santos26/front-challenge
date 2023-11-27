import { SocialVulnerability } from "./socialVulnerability"

export type Candidate = {
    id: string,
    firstName: string,
    lastName: string,
    userId: string,
    candidateSocialVulnerabilities: CandidateSocialVulnerabilities[];
}


export type CandidateSocialVulnerabilities = {
    socialVulnerability: SocialVulnerability;
}