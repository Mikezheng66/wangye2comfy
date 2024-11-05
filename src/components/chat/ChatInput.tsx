"use client"

export default function ChatInput({ onSend }: { onSend: (message: string) => void }) {
  return (
    <div className="border-t border-border p-4">
      <div className="flex gap-2">
        <input 
          type="text"
          placeholder="输入消息..."
          className="flex-1 rounded-xl px-4 py-2 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value) {
              onSend(e.currentTarget.value)
              e.currentTarget.value = ''
            }
          }}
        />
        <button 
          className="rounded-xl px-4 py-2 bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          onClick={() => {
            const input = document.querySelector('input')
            if (input?.value) {
              onSend(input.value)
              input.value = ''
            }
          }}
        >
          发送
        </button>
      </div>
    </div>
  )
} 