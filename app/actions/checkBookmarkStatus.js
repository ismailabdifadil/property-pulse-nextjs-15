'use server'

const { default: connectDB } = require('@/config/database')
const { default: User } = require('@/models/User')
const { default: getSessionUser } = require('@/utils/getSessionUser')

async function checkBookmarkStatus(propertyId) {
  await connectDB()

  const sessionUser = await getSessionUser()
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required')
  }

  const { userId } = sessionUser
  const user = await User.findById(userId)

  let isBookmarked = user.bookmarks.includes(propertyId)
  return { isBookmarked }
}

export default checkBookmarkStatus
