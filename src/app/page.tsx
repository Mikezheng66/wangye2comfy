import ChatWindow from '@/components/chat/ChatWindow'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="z-10 max-w-5xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">
          AI Assistant
        </h1>
        <ChatWindow />
      </div>
    </main>
  )
}
