import '../styles/globals.css'
import Sidebar from "../Components/Sidebar/Sidebar";
import BottomNavigation from "../Components/BottomNavigation/BottomNavigation";
import Header from "../Components/Header/Header";
import { useState } from 'react'
import Footer from '../Components/Footer/Footer';
import AuthContextProvider from '../Context/AuthContext'
import CartContextProvider from '../Context/CartContext';
import { SessionProvider } from "next-auth/react"
import Loader from '../Components/Loader/Loader'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [isAutoSuggestOpen, setIsAutoSuggestOpen] = useState(false)

  const handleWrapperClick = () => {
    if (isAutoSuggestOpen) {
      setIsAutoSuggestOpen(false)
    }
  }

  return (
    <SessionProvider session={session}>
      <AuthContextProvider>
        <CartContextProvider>
          <div className='theme'>
            <Sidebar />
            <div className="wrapper pt-24 md:pt-28" onClick={handleWrapperClick}>
              <Header isAutoSuggestOpen={isAutoSuggestOpen} setIsAutoSuggestOpen={setIsAutoSuggestOpen} />
              <Component {...pageProps} />
              <Footer />
              <BottomNavigation />
              {/* <Loader /> */}
            </div>
          </div>
        </CartContextProvider>
      </AuthContextProvider>
    </SessionProvider>
  )
}

export default MyApp
