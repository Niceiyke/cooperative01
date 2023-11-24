
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/dashboard"
import Login from "./pages/Login"
import Signup from "./pages/Register"


function App() {



  return (
      <Routes>
        <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Signup />} />
      </Routes>

  )
}

export default App
