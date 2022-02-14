interface IMessage {
  text: string
  sender: string | undefined
  receiver: string | undefined
  image: string
  media: string
  socketId: string
  timestamp: number
}

export default IMessage
