import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/utils/authOptions'
// Get session user from next auth

const getSessionUser = async () => {
  const session = await getServerSession(authOptions)

  if (!session || session === null) {
    return null
  }

  return {
    user: session.user,
    userId: session.user.id.toString(),
  }
}

export default getSessionUser
