interface IMessage {
  text: string
  sender: string | undefined
  image: string
  socketId: string
  timestamp: number
}

export default IMessage
