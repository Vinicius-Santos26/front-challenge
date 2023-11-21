import { CreateApplicationDto } from "../types/application";
import api from "./api";


export async function createApplication(application: CreateApplicationDto) {
    const { data } = await api.post<CreateApplicationDto>('/applications', application);
    return data;
}