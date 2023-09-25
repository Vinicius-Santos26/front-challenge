import { User } from "./user"

export type AuthDto  = {
  accessToken: string,
  user: User
}