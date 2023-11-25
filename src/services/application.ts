import { Application, CreateApplicationDto } from "../types/application";
import api from "./api";


export async function createApplication(application: CreateApplicationDto): Promise<Application>{
    const { data } = await api.post('applications', application);
    return data;
}

export async function getApplicationsByCandidate(candidateId: string): Promise<Application[]>{
    const { data } = await api.get("applications", { params: { candidateId } });

    return data;
}

export async function getApplicationById(applicationId: string): Promise<Application> {
    const { data } = await api.get(`applications/${applicationId}`);
  
    return data;
}