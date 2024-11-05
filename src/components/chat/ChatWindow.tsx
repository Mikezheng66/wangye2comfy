"use client"

import { useState } from 'react'
import { Message } from '@/types/chat'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export default function ChatWindow() {
  const [messages, setMessages] = useLocalStorage<Message[]>('chat-messages', [])
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async (content: string) => {
    const userMessage: Message = { role: 'user', content }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        })
      })

      if (!response.ok) {
        throw new Error('网络请求失败，请稍后重试')
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      if (data.choices?.[0]?.message) {
        setMessages(prev => [...prev, data.choices[0].message])
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `错误：${error instanceof Error ? error.message : '未知错误'}`
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const clearHistory = () => {
    if (window.confirm('确定要清空对话历史吗？')) {
      setMessages([])
    }
  }

  return (
    <div className="w-full h-[600px] rounded-2xl border border-border bg-secondary/30 backdrop-blur-xl flex flex-col">
      <div className="flex justify-between items-center px-4 py-2 border-b border-border">
        <h2 className="text-sm font-medium">对话历史</h2>
        <button
          onClick={clearHistory}
          className="text-sm text-foreground/60 hover:text-foreground"
        >
          清空历史
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <ChatMessage key={i} role={message.role} content={message.content} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-secondary">
              <div className="w-8 h-4 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-foreground/60 animate-bounce" />
                <div className="w-1.5 h-1.5 rounded-full bg-foreground/60 animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-foreground/60 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  )
}