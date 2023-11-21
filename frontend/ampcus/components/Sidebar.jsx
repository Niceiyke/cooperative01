"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { AiFillDashboard, AiFillSchedule } from 'react-icons/ai'
import { MdChangeCircle } from 'react-icons/md'

function Sidebar() {
    const [loanrequest, setLoanrequest] = useState(false)

    const handleLoanRequestToggle = () => { setLoanrequest(!loanrequest) }
    return (
        <div className='bg-gray-800 h-screen flex flex-col pl-2'>
            <div className="mb-4 pt-8 flex flex-row items-center"><AiFillDashboard size='20px' color="white" /><Link href='/dashboard' className=" ml-2 text-white font-black">Dashboard</Link></div>
            <div className="mb-2 pt-8 cursor-pointer flex flex-row items-center"><AiFillSchedule size='20px' color="white" /><Link href='/loan/request' className=" ml-2 text-white font-bold">Loan Request</Link>
            </div>
            <div className="mb-2 pt-8 cursor-pointer flex flex-row items-center"><AiFillSchedule size='20px' color="white" /><Link href='/loan/repayment' className=" ml-2 text-white font-bold">Loan Repayment</Link> </div>
            <div className="mb-4 pt-8  flex flex-row items-center"><MdChangeCircle size='20px' color="white" /><Link href='/change-contribution' className="  lg:block ml-2 text-white font-bold ">Change Contribution</Link></div>
            <div className="mb-4 pt-8  flex flex-row items-center"><AiFillSchedule size='20px' color="white" /><a className=" ml-2 text-white font-bold">Request Approval</a></div>

        </div>
    )
}

export default Sidebar