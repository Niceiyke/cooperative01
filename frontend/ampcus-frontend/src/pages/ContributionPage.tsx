import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import SplitScreen from '../layouts/SplitScreen'
import Contribution from '../components/Contribution'

function ContributionPage() {
    return (
        <div>
            <Navbar />
            <SplitScreen left={Sidebar} right={Contribution} />
        </div>
    )
}

export default ContributionPage