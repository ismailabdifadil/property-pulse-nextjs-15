import '@/assets/styles/globals.css'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import SessionProvider from '@/components/AuthProvider'
import AuthProvider from '@/components/AuthProvider'
import { ToastContainer } from 'react-toastify'
import { MessageContextProvider } from '@/context/messagesContext'
// import NextTopLoader from 'nextjs-toploader'
import 'photoswipe/dist/photoswipe.css'

export const metadata = {
  title: 'Property Pulse',
  keywords: ['Rental', 'Property', 'Real estate'],
  description: 'The perfect place to find your future house.',
}

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <MessageContextProvider>
        <html>
          <body>
            {/* <NextTopLoader color='white' showSpinner={false} /> */}
            <Navbar />
            <ToastContainer />
            <main>{children}</main>
            <Footer />
          </body>
        </html>
      </MessageContextProvider>
    </AuthProvider>
  )
}

export default MainLayout
