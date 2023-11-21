import FetchMembers from '@/components/FetchMembers'
import Sidebar from '@/components/Sidebar'
import React from 'react'

function Dashboard() {
    return (
        <div className='flex'>
            <div className='w-[20%]'> <Sidebar /> </div>
            <div className='w-[80%]'><FetchMembers /></div>
        </div>
    )
}

export default Dashboard