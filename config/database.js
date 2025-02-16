import mongoose from 'mongoose'

let connected = false

const connectDB = async () => {
  mongoose.set('strictQuery', true)
  if (connected) {
    console.log('Database is connected')
    return
  }

  // Connect to the database
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    connected = true
  } catch (error) {
    console.log('Error connecting to Mongo', error)
  }
}

export default connectDB
