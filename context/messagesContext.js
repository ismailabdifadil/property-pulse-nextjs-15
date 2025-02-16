'use client'

import unreadMessages from '@/app/actions/unreadMessages'
import { useSession } from 'next-auth/react'
const { useContext, useState, createContext, useEffect } = require('react')
const MessagesContext = createContext()

export const MessageContextProvider = ({ children }) => {
  const [messageCount, setMessageCount] = useState(0)
  const { data: session } = useSession()
  console.log(session)
  useEffect(() => {
    const fetchUnreadMessagesCount = async () => {
      if (!session && !session?.user) return
      const { count } = await unreadMessages()
      setMessageCount(count)
    }
    fetchUnreadMessagesCount()
  }, [messageCount, session])
  return (
    <MessagesContext.Provider value={{ messageCount, setMessageCount }}>
      {children}
    </MessagesContext.Provider>
  )
}
const useMessageCount = () => {
  if (!MessagesContext) {
    throw new Error('useCount must be used within a MessageContextProvider')
  }
  const { messageCount, setMessageCount } = useContext(MessagesContext)
  return { messageCount, setMessageCount }
}

export default useMessageCount
