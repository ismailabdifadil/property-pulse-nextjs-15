import Pagination from '@/components/Pagination'
import PropertyCard from '@/components/PropertyCard'
import PropertySearchForm from '@/components/PropertySearchForm'
import connectDB from '@/config/database'
import Property from '@/models/Property'
const PropertyPage = async ({ searchParams: { page = 1, pageSize = 3 } }) => {
  await connectDB()
  const skip = (page - 1) * pageSize

  const total = await Property.countDocuments({})
  const properties = await Property.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(pageSize)
  return (
    <>
      <section className='bg-blue-700 py-4'>
        <div className='max-w-7xl flex flex-col mx-auto items-start sm:px-6 px-4 lg:px-8'>
          <PropertySearchForm />
        </div>
      </section>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto'>
          {properties.length === 0 ? (
            <p>No properties found.</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
        {total > pageSize && (
          <Pagination
            page={parseInt(page)}
            pageSize={parseInt(pageSize)}
            total={total}
          />
        )}
      </section>
    </>
  )
}

export default PropertyPage
