import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Paste from './components/Paste'
import ViewPaste from './components/SinglePaste'
import Footer from './components/footer'
// import { createContext, useState, useEffect } from 'react'

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

// export const DarkModeContext = createContext()

function App() {
  // const [isDarkMode, setIsDarkMode] = useState(() => {
  //   const saved = localStorage.getItem('darkMode')
  //   return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches
  // })

  // useEffect(() => {
  //   if (isDarkMode) {
  //     document.documentElement.classList.add('dark')
  //   } else {
  //     document.documentElement.classList.remove('dark')
  //   }
  //   localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
  // }, [isDarkMode])

  // const toggleDarkMode = () => setIsDarkMode(prev => !prev)

  return (
    // <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <div className='bg-gradient-to-br from-gray-60 to-gray-400'>
        <RouterProvider router={router} />
      </div>
    // </DarkModeContext.Provider>
  )
}
export default App
