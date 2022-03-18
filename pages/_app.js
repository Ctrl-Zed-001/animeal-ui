import '../styles/globals.css'
import Sidebar from "../Components/Sidebar/Sidebar";
import BottomNavigation from "../Components/BottomNavigation/BottomNavigation";
import Header from "../Components/Header/Header";
import { useState } from 'react'


function MyApp({ Component, pageProps }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleWrapperClick = () => {
    if (isOpen) {
      setIsOpen(false)
    }
  }

  return (
    <div className='theme'>
      <script src='/js/jquery-3.3.1.min.js' />
      <script src="/js/main.js" />

      <Sidebar />
      <div className="wrapper pt-28 md:pt-20" onClick={handleWrapperClick}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <Component {...pageProps} />
        <BottomNavigation />
      </div>
    </div>
  )
}

export default MyApp
