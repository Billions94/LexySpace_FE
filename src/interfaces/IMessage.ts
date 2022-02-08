interface IMessage {
  text: string
  sender: string | undefined
  image: string
  media: string
  socketId: string
  timestamp: number
}

export default IMessage
