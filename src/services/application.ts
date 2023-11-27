import { Application, CreateApplicationDto, UpdateApplicationDto } from "../types/application";
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

export async function getApplicationsByJob(jobId: string): Promise<Application[]>{
    const { data } = await api.get("applications", { params: { jobId } });

    return data;
}


export async function updateApplication(updateApplication: UpdateApplicationDto, applicationId: string) {
    const { data } = await api.patch(`applications/${applicationId}`, updateApplication);

    return data;
}