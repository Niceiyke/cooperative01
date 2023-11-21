import LoanRequestForm from '@/components/LoanRequestForm'
import Sidebar from '@/components/Sidebar'
import React from 'react'

function LoanRequest() {
    return (
        <div className='flex'>
            <div className='hidden md:block md:w-[15%] mt-1'> <Sidebar /> </div>
            <div className='w-[100%] md:w-[85%]  mt-1'><h1 className='text-center my-auto'>Coming Soon</h1></div>
        </div>

    )
}

export default LoanRequest