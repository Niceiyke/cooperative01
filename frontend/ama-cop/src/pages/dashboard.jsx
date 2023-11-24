import React from 'react'
import Navbar from '../components/Navbar'
import SplitScreen from '../layouts/SplitScreen'
import Sidebars from '../components/Sidebars'
import FetchMembers from '../components/Member'

function Dashboard() {
  return (
    <div>
        <Navbar/>
        <SplitScreen left={Sidebars} right={FetchMembers}/>
    </div>
  )
}

export default Dashboard