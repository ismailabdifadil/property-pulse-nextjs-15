import connectDB from '@/config/database'
import Property from '@/models/Property'
import FeaturedCard from './FeaturedCard'

const FeaturedProperties = async () => {
  await connectDB()

  const featuredProperties = await Property.find({ is_featured: true }).lean()
  const getRatesDisplay = () => {
    const { rates } = property
    if (rates.monthly) {
      return `$${rates.monthly.toLocaleString()}/mo`
    } else if (rates.weekly) {
      return `$${rates.weekly.toLocaleString()}/wk`
    } else if (rates.nightly) {
      return `$${rates.daily.toLocaleString()}/nightly`
    }
  }
  return (
    <section className='bg-blue-50 px-4 pt-6 pb-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
          Featured Properties
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {featuredProperties.length > 0 ? (
            featuredProperties.map((property) => (
              <FeaturedCard property={property} />
            ))
          ) : (
            <P>No featured Properties</P>
          )}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProperties
