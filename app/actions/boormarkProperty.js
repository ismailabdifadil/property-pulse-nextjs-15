'use server'
import connectDB from '@/config/database'
import User from '@/models/User'
import getSessionUser from '@/utils/getSessionUser'

const { revalidatePath } = require('next/cache')

async function bookmarkProperty(propertyId) {
  await connectDB()
  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required')
  }
  const { userId } = sessionUser

  const user = await User.findById(userId)

  let isBookmarked = user.bookmarks.includes(propertyId)
  let message

  if (isBookmarked) {
    user.bookmarks.pull(propertyId)
    message = 'Property Removed'
    isBookmarked = false
  } else {
    user.bookmarks.push(propertyId)
    message = 'Property Bookmarked'
    isBookmarked = true
  }

  await user.save()
  revalidatePath('properties/saved', 'page')
  return { message, isBookmarked }
}

export default bookmarkProperty
