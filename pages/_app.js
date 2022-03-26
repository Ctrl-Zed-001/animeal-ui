import '../styles/globals.css'
import Sidebar from "../Components/Sidebar/Sidebar";
import BottomNavigation from "../Components/BottomNavigation/BottomNavigation";
import Header from "../Components/Header/Header";
import { useState } from 'react'
import Footer from '../Components/Footer/Footer';
import AuthContextProvider from '../Context/AuthContext'
import CartContextProvider from '../Context/CartContext';

function MyApp({ Component, pageProps }) {
  const [isAutoSuggestOpen, setIsAutoSuggestOpen] = useState(false)

  const handleWrapperClick = () => {
    if (isAutoSuggestOpen) {
      setIsAutoSuggestOpen(false)
    }
  }

  return (
    <AuthContextProvider>
      <CartContextProvider>
        <div className='theme'>
          <Sidebar />
          <div className="wrapper pt-28 md:pt-20" onClick={handleWrapperClick}>
            <Header isAutoSuggestOpen={isAutoSuggestOpen} setIsAutoSuggestOpen={setIsAutoSuggestOpen} />
            <Component {...pageProps} />
            <Footer />
            <BottomNavigation />
          </div>
        </div>
      </CartContextProvider>
    </AuthContextProvider>
  )
}

export default MyApp
