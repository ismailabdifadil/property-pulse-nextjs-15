import MessageCard from '@/components/MessageCard'
import connectDB from '@/config/database'
import Message from '@/models/Message'
import { convertToSerializableObject } from '@/utils/convertIntoObject'
import getSessionUser from '@/utils/getSessionUser'

const MessagesPage = async () => {
  await connectDB()
  const { userId } = await getSessionUser()
  const readMessages = await Message.find({
    recipient: userId,
    read: true,
  })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean()
  const unreadMessages = await Message.find({
    recipient: userId,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean()

  const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
    const message = convertToSerializableObject(messageDoc)
    message.sender = convertToSerializableObject(messageDoc.sender)
    message.property = convertToSerializableObject(messageDoc.property)
    return message
  })

  return (
    <>
      <section class='bg-blue-50'>
        <div class='container m-auto py-24 max-w-6xl'>
          <div class='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
            <h1 class='text-3xl font-bold mb-4'>Your Messages</h1>
            <div class='space-y-4'>
              {messages.length === 0 ? (
                <p class='text-gray-500 text-xl'>You have no messages.</p>
              ) : (
                messages.map((message) => (
                  <MessageCard
                    key={message._id}
                    propertyName={message.property.name}
                    message={message}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MessagesPage
