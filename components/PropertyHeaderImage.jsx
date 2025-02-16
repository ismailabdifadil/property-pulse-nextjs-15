'use client'
import Image from 'next/image'
import { Gallery, Item } from 'react-photoswipe-gallery'

const PropertyHeaderImage = ({ image }) => {
  return (
    <Gallery>
      <section>
        <div className='container-xl m-auto'>
          <div className='grid grid-cols-1'>
            <Item original={image} thumbnail={image} width='1000' height='600'>
              {({ ref, open }) => (
                <Image
                  src={image}
                  ref={ref}
                  onClick={open}
                  alt=''
                  className='object-cover h-[400px] w-full'
                  width={0}
                  sizes='100vw'
                  height={0}
                />
              )}
            </Item>
          </div>
        </div>
      </section>
    </Gallery>
  )
}

export default PropertyHeaderImage
