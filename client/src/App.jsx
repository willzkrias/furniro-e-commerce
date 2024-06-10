import { BrowserRouter as BrowserRoutes, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Admin from './Pages/Admin'
import Register from './Pages/Register'

function App() {

  return (
    <>
    <BrowserRoutes>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path='/register' element={<Register />} />
    </Routes>
    </BrowserRoutes>
    
    </>
  )
}

export default App
