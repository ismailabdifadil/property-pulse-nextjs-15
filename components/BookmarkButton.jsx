'use client'
import bookmarkProperty from '@/app/actions/boormarkProperty'
import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { FaBookmark } from 'react-icons/fa'
import { toast } from 'react-toastify'

const BookmarkButton = ({ property }) => {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [loading, setLoading] = useState(true)

  const { data: session } = useSession()
  const userId = session?.user?.id

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    checkBookmarkStatus(property._id).then((res) => {
      if (res.error) toast.error(res.error)
      if (res.isBookmarked) setIsBookmarked(res.isBookmarked)
      setLoading(false)
    })
  }, [property._id, userId, checkBookmarkStatus])
  const handleClick = async () => {
    if (!userId) {
      toast.error('Please sign in to bookmark properties')
      return
    }
    try {
      const res = await bookmarkProperty(property._id)
      setIsBookmarked(res.isBookmarked)
      toast.success(res.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  if (loading) return <p className='text-center'>Loading...</p>
  return (
    <button
      className={`${
        isBookmarked
          ? 'bg-red-500 hover:bg-red-600'
          : 'bg-blue-500 hover:bg-blue-600'
      }  text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
      onClick={handleClick}
    >
      <FaBookmark className='mr-2' />{' '}
      {isBookmarked ? 'Remove Bookmark' : 'Bookmark Property'}
    </button>
  )
}

export default BookmarkButton
