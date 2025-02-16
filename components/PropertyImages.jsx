'use client'
import Image from 'next/image'
import { Gallery, Item } from 'react-photoswipe-gallery'

const PropertyImages = ({ images }) => {
  return (
    <Gallery>
      <section className='bg-blue-50 p-4'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-2 gap-4'>
            {images.length === 1 ? (
              <div className='col-span-2'>
                <Item
                  original={images[0]}
                  thumbnail={images[0]}
                  width='1024'
                  height='768'
                >
                  {({ ref, open }) => (
                    <Image
                      src='/images/properties/a1.jpg'
                      ref={ref}
                      onClick={open}
                      alt=''
                      className='object-cover h-[400px] w-full rounded-xl cursor-pointer'
                      width={0}
                      height={0}
                    />
                  )}
                </Item>
              </div>
            ) : (
              images.map((image, index) => (
                <div
                  key={index}
                  className={`${
                    images.length === 3 && index === 2
                      ? 'col-span-2'
                      : 'col-span-1'
                  }`}
                >
                  <Item
                    original={image}
                    thumbnail={image}
                    width='1000'
                    height='500'
                  >
                    {({ ref, open }) => (
                      <Image
                        src={image}
                        ref={ref}
                        onClick={open}
                        alt=''
                        className='object-cover h-[400px] w-full rounded-xl cursor-pointer'
                        width={1800}
                        height={200}
                      />
                    )}
                  </Item>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </Gallery>
  )
}

export default PropertyImages
