import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Paste from './components/Paste'
import ViewPaste from './components/SinglePaste'
import Footer from './components/footer'
import { useEffect } from 'react'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: 
      <div>
        <Navbar />
        <Home />
        <Footer />
      </div>
    },
    {
      path: '/paste',
      element:
      <div>
        <Navbar />
        <Paste />
        <Footer />
      </div>
    },
    {
      path: '/paste/:id',
      element:
      <div>
        <Navbar />
        <ViewPaste />
        <Footer />
      </div>
    }
  ]
)

function App() {
  useEffect(()=>{
    const preferedPage = localStorage.getItem("preferredPage");
    if(preferedPage && preferedPage != '/'){
      router.navigate(preferedPage);
    }
  },[])

  return (
      <div className='bg-gradient-to-br from-gray-60 to-gray-400'>
        <RouterProvider router={router} />
      </div>
  )
}
export default App
