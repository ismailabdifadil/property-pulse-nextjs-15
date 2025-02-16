'use client'
import deleteProperty from '@/app/actions/deleteProperty'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'
import DeletePropertyButton from './DeletePropertyButton'
import Button from './shared/Button'

const ProfileProperties = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties)

  const handleDeleteProperty = async (formData) => {
    const propertyId = formData.get('property-id')

    const confirmed = window.confirm('Are you sure you want to delete')

    if (!confirmed) return

    // Server action
    await deleteProperty(propertyId)
    const updatedProperties = properties.filter((p) => p._id !== propertyId)
    setProperties(updatedProperties)

    toast.success('Property Deleted Successfully')
  }
  return properties.map((property) => (
    <div className='mb-10' key={property._id}>
      <Link href={`/properties/${property._id}`}>
        <Image
          className='h-32 w-full rounded-md object-cover'
          src={`${property.images[0]}`}
          alt='Property 1'
          width={2000}
          height={2000}
          priority={true}
        />
      </Link>
      <div className='mt-2'>
        <p className='text-lg font-semibold'>{property.name}</p>
        <p className='text-gray-600'>
          {' '}
          {property.location.city}, {property.location.street}
        </p>
      </div>
      <div className='mt-2 flex gap-3 items-center'>
        <Link
          href={`/properties/${property._id}/edit`}
          className='bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 '
        >
          Edit
        </Link>
        <form action={handleDeleteProperty}>
          <input type='hidden' name='property-id' value={property._id} />
          <Button type='submit' actionType='delete'>
            Delete
          </Button>
        </form>
      </div>
    </div>
  ))
}

export default ProfileProperties
