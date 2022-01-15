import { Room } from "./Room";

export interface IUser {
  userName: string
  socketId: string,
  room: Room

}
