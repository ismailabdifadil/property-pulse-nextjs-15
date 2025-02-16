'use server'

import connectDB from '@/config/database'
import Message from '@/models/Message'
import getSessionUser from '@/utils/getSessionUser'
import { revalidatePath } from 'next/cache'

async function markMessageAsRead(messageId) {
  await connectDB()
  const sessionUser = await getSessionUser()
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required')
  }
  const { userId } = sessionUser
  const message = await Message.findById(messageId)

  if (!message) throw new Error('Message not found')

  // Verify Ownership of the message
  if (userId !== message.recipient.toString()) {
    throw new Error('You are not authorized to mark this message as read')
  }

  message.read = true

  await message.save()
  revalidatePath('/messages', 'page')
  return message.read
}

export default markMessageAsRead
