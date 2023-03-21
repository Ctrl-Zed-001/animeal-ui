import '../styles/globals.css'
import Sidebar from "../Components/Sidebar/Sidebar";
import BottomNavigation from "../Components/BottomNavigation/BottomNavigation";
import Header from "../Components/Header/Header";
import { useEffect, useState } from 'react'
import Footer from '../Components/Footer/Footer';
import AuthContextProvider from '../Context/AuthContext'
import CartContextProvider from '../Context/CartContext';
import { SessionProvider } from "next-auth/react"
import Loader from '../Components/Loader/Loader'
import OneSignal from 'react-onesignal';
import { useRouter } from 'next/router';
import Head from 'next/head';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [isAutoSuggestOpen, setIsAutoSuggestOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    runOneSignal()
  }, [])

  async function runOneSignal() {
    await OneSignal.init({ appId: '440c5016-f64b-434e-b679-d3b2e114861c', allowLocalhostAsSecureOrigin: true });
    OneSignal.showSlidedownPrompt();
  }

  const handleWrapperClick = () => {
    if (isAutoSuggestOpen) {
      setIsAutoSuggestOpen(false)
    }
  }

  return (
    <SessionProvider session={session}>
      <Head>
        <link rel="canonical" href={`https://animeal.in${router.asPath}`} />
      </Head>
      <AuthContextProvider>
        <CartContextProvider>
          <div className='theme'>
            <Sidebar />
            <div className="wrapper pt-20 md:pt-28" onClick={handleWrapperClick}>
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
