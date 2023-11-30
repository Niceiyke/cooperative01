
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/dashboard"
import Login from "./pages/Login"
import Signup from "./pages/Register"
import LoanRequestPage from "./pages/LoanRequest"
import { RequiredAuth } from "./components/RequiredAuth"
import Logout from "./components/Logout"
import ProfilePage from "./pages/profilePage"
import ContributionPage from "./pages/ContributionPage"
import RepaymentPage from "./pages/RepaymentPage"


function App() {



  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Signup />} />
      <Route path='/logout' element={<Logout />} />
      {/*protected Routes */}
      <Route element={<RequiredAuth />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/loan-request' element={<LoanRequestPage />} />
        <Route path='/change-contribution' element={<ContributionPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/loan-repayment' element={<RepaymentPage />} />
      </Route>
    </Routes>

  )
}

export default App
