'use client'
import Image from 'next/image'
import React from 'react'
import pix from '@/static/images/DSC_0309.JPG'
import { useUser } from '@/context/useUser'

async function FetchMembers() {
    const { accessToken }=useUser()
    console.log(accessToken)
    const res = await fetch('http://127.0.0.1:8000/api/member/2', { cache: 'no-cache' })
    const member = await res.json()

    if (res.ok) {

       

        console.log(member)

    }
    else {
        console.log('res')
    }


    return (
        <div>
            {
                <div className='mt-2 bg-primary h-screen '>
                    <div className='flex flex-col items-center '>
                        <Image src={pix} width={150} height={200} alt='profile picture' className='mx-auto rounded-md' />
                        <h3 className=''><span>Location:</span><span className='pl-1'>{member.location}</span></h3>
                    </div>
                    <div className='mt-8 mx-2 flex flex-1 justify-between bg-gray-200  px-2'>
                        <div className='flex flex-col items-center'><h4>First Name</h4> <p>{member.user.first_name}</p></div>
                        <div className='flex flex-col items-center'><h4>Last Name</h4> <p>{member.user.last_name}</p></div>
                        <div className='flex flex-col items-center'><h4>Sap Number</h4> <p>{member.user.sap_number}</p></div>
                        <div className='flex flex-col items-center'><h4>Email</h4> <p>{member.user.email}</p></div>
                    </div>
                    <div className='mt-8 mx-2 flex justify-between bg-gray-200  px-2'>
                        <div className='flex flex-col items-center'><h4>Monthly Contribution</h4> <p>{member.monthly_contribution}</p></div>
                        <div className='flex flex-col items-center'><h4>Bank Name</h4> <p>{member.bank_name}</p></div>
                        <div className='flex flex-col items-center'><h4>Account Number</h4> <p>{member.bank_account}</p></div>

                    </div>
                    <div className='mt-8 mx-2 flex justify-between bg-gray-200  px-2'>
                        <div className='flex flex-col items-center'><h4>Total Contribution</h4> <p>{member.total_contribution}</p></div>
                        <div className='flex flex-col items-center'><h4>Total Loan</h4> <p>{member.total_loan}</p></div>
                        <div className='flex flex-col items-center'><h4>Avaliable Balance</h4> <p>{member.avaliable_balance}</p></div>
                    </div>

                    <div className="overflow-x-auto">
                        <h3 className='text-center mt-4 mb-4'>Active Loan</h3>
                        <table className="min-w-full divide-y divide-gray-200">

                            <thead className="bg-gray-200">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                                        Type Of Loan
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                                        Date Collected
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                                        Amount Borrowed
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                                        Amount Repaid
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                                        Loan Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200'>
                                {
                                    member.existing_loan.map(loan =>

                                        <tr className="bg-white border-b" key={loan.id} >
                                            <td scope="row" className="px-6 py-4 whitespace-nowrap">
                                                {loan.loan_types}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {loan.date_approved}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {loan.borrowed_amount}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {loan.repaid_amount}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {loan.is_active ? <p>Active</p> : <p>Repaid</p>}
                                            </td>

                                        </tr>

                                    )
                                }

                            </tbody>
                        </table>
                    </div>



                </div>

            }
        </div>
    )
}

export default FetchMembers