interface IMessage {
  text: string
  sender: string | undefined
  socketId: string
  timestamp: number
}

export default IMessage
