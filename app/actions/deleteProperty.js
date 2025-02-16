'use server'
import cloudinary from '@/config/cloudinary'
import connectDB from '@/config/database'
import Property from '@/models/Property'
import getSessionUser from '@/utils/getSessionUser'
import { revalidatePath } from 'next/cache'

const deleteProperty = async (propertyId) => {
  await connectDB()
  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.user) {
    throw new Error('User is required')
  }

  const { userId } = sessionUser

  const property = await Property.findById(propertyId)

  if (!property) {
    throw new Error('Property not found')
  }

  //   Verify ownership of the property
  if (property.owner.toString() !== userId) {
    throw new Error('You authorized to delete this property')
  }

  //   Extract images from the property
  const publicIds = property.images.map((imageUrl) => {
    const ports = imageUrl.split('/')
    const id = ports.at(-1).split('.').at(0)
    return id
  })

  //   Delete images from cloudinary
  if (publicIds.length > 0) {
    for (const publicId of publicIds) {
      await cloudinary.uploader.destroy('property-pulse/' + publicId)
    }
  }

  await property.deleteOne()

  revalidatePath('/', 'layout')
}

export default deleteProperty
