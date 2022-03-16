import '../styles/globals.css'
import Sidebar from "../Components/Sidebar/Sidebar";
import BottomNavigation from "../Components/BottomNavigation/BottomNavigation";
import Header from "../Components/Header/Header";


function MyApp({ Component, pageProps }) {
  return (
    <div className='theme'>
      <script src='/js/jquery-3.3.1.min.js' />
      <script src="/js/main.js" />

      <Sidebar />
      <div className="wrapper pt-28 md:pt-0">
        <Header />
        <Component {...pageProps} />
        <BottomNavigation />
      </div>
    </div>
  )
}

export default MyApp
