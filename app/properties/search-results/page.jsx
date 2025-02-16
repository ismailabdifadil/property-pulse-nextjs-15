import PropertyCard from '@/components/PropertyCard'
import PropertySearchForm from '@/components/PropertySearchForm'
import connectDB from '@/config/database'
import Property from '@/models/Property'
import { convertToSerializableObject } from '@/utils/convertIntoObject'
import Link from 'next/link'
import { FaArrowAltCircleLeft } from 'react-icons/fa'

const SearchPropertiesPage = async ({ searchParams: { location, type } }) => {
  await connectDB()

  const locationPattern = new RegExp(location, 'i')
  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { 'location.street': locationPattern },
      { 'location.city': locationPattern },
      { 'location.zipcode': locationPattern },
    ],
  }

  if (type && type !== 'All') {
    const typePattern = new RegExp(type, 'i')
    query.type = typePattern
  }

  const propertiesQueryResults = await Property.find(query).lean()
  const properties = convertToSerializableObject(propertiesQueryResults)
  return (
    <>
      <section className='bg-blue-700 py-4'>
        <div className='max-w-7xl flex flex-col mx-auto items-start sm:px-6 px-4 lg:px-8'>
          <PropertySearchForm />
        </div>
      </section>
      <section className='px-4 py-6'>
        <div className='container-lg lg:container m-auto px-4 py-6'>
          <Link
            href='/properties'
            className='flex items-center text-blue-500 hover:underline mb-3'
          >
            <FaArrowAltCircleLeft className='mr-2 mb-1' /> Back To Properties
          </Link>
          <h1 className='text-2xl mb-2'>Search Results</h1>
          {properties.length === 0 ? (
            <p>No search Results</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default SearchPropertiesPage
