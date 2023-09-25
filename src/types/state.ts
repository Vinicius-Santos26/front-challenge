import { Country } from "./country";

export type State = {
  id: string;
  name: string;
  shortName: string;
  country: Country;
}