
import FetchMembers from '@/components/FetchMembers'
import Sidebar from '@/components/Sidebar'
import React from 'react'

function Dashboard() {
    return (
        <div className='flex h-screen '>
            <div className='hidden md:block md:w-[15%] mt-1'> <Sidebar /> </div>
            <div className='w-[100%] md:w-[85%]  mt-1 '><FetchMembers /></div>
        </div>
    )
}

export default Dashboard