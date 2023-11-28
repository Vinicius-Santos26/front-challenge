export type Position = {
  id: string, 
  name: string,
  companyId: string
}

export type CreatePositionDto  = {
  name: string;
  companyId: string;
}
