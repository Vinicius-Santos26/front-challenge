import { Candidate } from "../types/candidate";
import api from "./api";


export async function getCandidateByUserId(userId: string): Promise<Candidate> {
  const { data } = await api.get('/candidates', {params: {userId}});

  return data;
}
