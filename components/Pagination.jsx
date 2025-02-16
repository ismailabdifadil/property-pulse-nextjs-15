import Link from 'next/link'

const Pagination = ({ page, pageSize, total }) => {
  const totalPages = Math.ceil(total / pageSize)
  return (
    <section className='container mx-auto flex items-center justify-center my-8'>
      {page > 1 && (
        <Link
          href={`/properties?page=${page - 1}`}
          className='mr-2 px-2 border border-gray-300 py-1 rounded'
        >
          Previous
        </Link>
      )}
      <span className='mr-2'>
        Page {page} of {totalPages}
      </span>
      {page < totalPages && (
        <Link
          href={`/properties?page=${page + 1}`}
          className='ml-2 px-2 border border-gray-300 py-1 rounded'
        >
          Next
        </Link>
      )}
    </section>
  )
}

export default Pagination
