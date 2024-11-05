import { ChatResponse, Message } from '@/types/chat'

if (!process.env.DEEPSEEK_API_KEY) {
  throw new Error('Missing DEEPSEEK_API_KEY environment variable')
}

export async function POST(request: Request) {
  const { messages } = await request.json()
  
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        temperature: 0.7,
      })
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }

    const data: ChatResponse = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error('Error:', error)
    return Response.json({ error: '请求失败' }, { status: 500 })
  }
} 