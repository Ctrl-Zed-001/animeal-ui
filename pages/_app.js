import '../styles/globals.css'
import Sidebar from "../Components/Sidebar/Sidebar";
import BottomNavigation from "../Components/BottomNavigation/BottomNavigation";
import Header from "../Components/Header/Header";
import { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import config from '../config.json'
import AuthContextProvider from '../Context/AuthContext'

function MyApp({ Component, pageProps }) {
  const [isAutoSuggestOpen, setIsAutoSuggestOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  const handleWrapperClick = () => {
    if (isAutoSuggestOpen) {
      setIsAutoSuggestOpen(false)
    }
  }

  return (
    <AuthContextProvider>
      <div className='theme'>
        <script src='/js/jquery-3.3.1.min.js' />
        <script src="/js/main.js" />

        <Sidebar />
        <div className="wrapper pt-28 md:pt-20" onClick={handleWrapperClick}>
          <Header isAutoSuggestOpen={isAutoSuggestOpen} setIsAutoSuggestOpen={setIsAutoSuggestOpen} showAuthModal={showAuthModal} setShowAuthModal={setShowAuthModal} />
          <Component {...pageProps} />
          <BottomNavigation showAuthModal={showAuthModal} setShowAuthModal={setShowAuthModal} />
        </div>
      </div>
    </AuthContextProvider>
  )
}

export default MyApp
