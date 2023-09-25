import { Position } from "../types/position";
import api from "./api";

export async function getPositions(companyId:string): Promise<Position[]> {
  const { data } = await api.get(`/positions/${companyId}`);

  return data;
}
