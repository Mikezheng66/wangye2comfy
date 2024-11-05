"use client"

import { useState } from 'react'
import MarkdownContent from './MarkdownContent'

interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} group`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
        role === 'user' 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-secondary'
      }`}>
        <div className="relative">
          <MarkdownContent content={content} />
          <button
            onClick={handleCopy}
            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs hover:text-primary bg-background/80 rounded px-2 py-1"
          >
            {copied ? '已复制' : '复制'}
          </button>
        </div>
      </div>
    </div>
  )
}