import '../styles/globals.css'
import Sidebar from "../Components/Sidebar/Sidebar";
import BottomNavigation from "../Components/BottomNavigation/BottomNavigation";
import Header from "../Components/Header/Header";
import { useState } from 'react'


function MyApp({ Component, pageProps }) {
  const [isAutoSuggestOpen, setIsAutoSuggestOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  const handleWrapperClick = () => {
    if (isAutoSuggestOpen) {
      setIsAutoSuggestOpen(false)
    }
  }

  return (
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
  )
}

export default MyApp
