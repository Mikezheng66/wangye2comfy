export type Message = {
  role: 'user' | 'assistant'
  content: string
}

export type ChatResponse = {
  choices: Array<{
    message: Message
  }>
} 