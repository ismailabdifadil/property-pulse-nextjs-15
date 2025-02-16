'use client'
import deleteMessage from '@/app/actions/deleteMessage'
import markMessageAsRead from '@/app/actions/markMessageAsRead'
import useMessageCount from '@/context/messagesContext'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Button from './shared/Button'

function MessageCard({ propertyName, message }) {
  const [isRead, setIsRead] = useState(message.read)
  const [isDeleted, setIsDeleted] = useState(false)
  const { setMessageCount } = useMessageCount()
  const handleReadClick = async () => {
    const read = await markMessageAsRead(message._id)
    setIsRead(read)
    setMessageCount((prev) => prev - 1)
    toast.success('Marked as read')
  }

  const handleDeleteMessage = async () => {
    const deleted = await deleteMessage(message._id)
    if (deleted) {
      toast.success('Message deleted successfully')
      setIsDeleted(true)
    } else {
      toast.error('Failed to delete message')
    }
  }

  if (isDeleted) return <p>Deleted Message</p>

  return (
    <div class='space-y-4'>
      <div class='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
        {!isRead && (
          <p className='absolute top-2 right-2 bg-yellow-500 px-2 py-1 rounded-md border border-yellow-700 text-white'>
            New
          </p>
        )}
        <h2 class='text-xl mb-4'>
          <span class='font-bold'>Property Inquiry: </span>
          {propertyName}
        </h2>
        <p class='text-gray-700'>{message.body}</p>

        <ul class='mt-4'>
          <li>
            <strong>Name: </strong> John Doe
          </li>

          <li>
            <strong>Reply Email: </strong>
            <a href={`mailto:${message.email}`} class='text-blue-500'>
              {message.email}
            </a>
          </li>
          <li>
            <strong>Reply Phone: </strong>
            <a href={`tel:${message.phone}`} class='text-blue-500'>
              {message.phone}
            </a>
          </li>
          <li>
            <strong>Received: </strong>
            {new Date(message.createdAt).toLocaleString()}
          </li>
        </ul>
        <div className='flex gap-3 items-center mt-4'>
          <Button onClick={handleReadClick}>Mark As Read</Button>
          <Button actionType='delete' onClick={handleDeleteMessage}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MessageCard
