import { CreatePositionDto, Position } from "../types/position";
import api from "./api";

export async function getPositions(companyId:string): Promise<Position[]> {
  const { data } = await api.get(`/positions/${companyId}`);

  return data;
}

export async function createPosition(
  position: CreatePositionDto
) {
  const { data } = await api.post("positions", position);

  return data;
}