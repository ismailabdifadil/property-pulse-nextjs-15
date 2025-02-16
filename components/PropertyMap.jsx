'use client'
import { useEffect, useState } from 'react'
import MapComponent from './MapComponent'
const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [loading, setLoading] = useState(true)
  const [geocodeError, setGeocodeError] = useState(false)

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const address = `${property.location.street}, ${property.location.city}, ${property.location.state}, ${property.location.zipcode}`
        const apiKey = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            address
          )}.json?access_token=${apiKey}`
        )
        const data = await res.json()

        if (data.features.length === 0) {
          setGeocodeError(true)
          return
        }

        const [lng, lat] = data.features[0].center
        setLat(lat)
        setLng(lng)
      } catch (error) {
        console.error('Geocoding Error:', error)
        setGeocodeError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchCoords()
  }, [property])

  if (loading) return <h3>Loading map...</h3>
  if (geocodeError) return <div className='text-xl'>No location data found</div>

  return (
    <>
      <MapComponent latitude={lat} longitude={lng} />
    </>
  )
}

export default PropertyMap
