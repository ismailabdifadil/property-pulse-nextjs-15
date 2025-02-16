'use client'
import { useFormStatus } from 'react-dom'
const DeletePropertyButton = () => {
  const { pending } = useFormStatus()
  return (
    <button
      className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed'
      type='submit'
      disabled={pending}
    >
      {pending ? 'Deleting...' : 'Delete'}
    </button>
  )
}

export default DeletePropertyButton
