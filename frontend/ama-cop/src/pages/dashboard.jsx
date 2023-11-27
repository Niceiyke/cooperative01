import React from 'react'
import Navbar from '../components/Navbar'
import SplitScreen from '../layouts/SplitScreen'
import Sidebar from '../components/Sidebar'
import FetchMembers from '../components/Member'

function Dashboard() {
  return (
    <div>
      <Navbar />
      <SplitScreen left={Sidebar} right={FetchMembers} />
    </div>
  )
}

export default Dashboard