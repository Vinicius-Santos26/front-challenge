import { Recruiter } from "../types/recruiter";
import api from "./api";


export async function getRecruiterByUserId(userId: string): Promise<Recruiter> {
  const { data } = await api.get(`/recruiters/${userId}`);

  return data;
}
