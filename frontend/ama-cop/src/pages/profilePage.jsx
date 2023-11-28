import React from 'react'
import Sidebar from '../components/Sidebar'
import Profile from '../components/Profile'
import Navbar from '../components/Navbar'
import SplitScreen from '../layouts/SplitScreen'

function profilePage() {
    return (
        <div>
            <Navbar />
            <SplitScreen left={Sidebar} right={Profile} />
        </div>
    )
}

export default profilePage