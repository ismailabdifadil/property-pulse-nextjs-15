'use client'
import { useFormStatus } from 'react-dom'

const EditButton = () => {
  const { pending } = useFormStatus()
  return (
    <button
      className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
      type='submit'
    >
      {pending ? <p>Loading</p> : <p>Edit Property</p>}
    </button>
  )
}

export default EditButton
