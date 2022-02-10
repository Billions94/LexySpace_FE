import { Room } from "./Room";

export interface IUser {
  _id?: string
  userName: string
  image: string
  socketId: string
  room: Room

}
