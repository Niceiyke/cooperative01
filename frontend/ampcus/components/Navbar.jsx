import Link from 'next/link'
import React from 'react'

function Navbar() {
    const user = false

    return (
        <nav className='flex justify-between items-center bg-slate-900 text-primary-text p-2'>
            <h1><Link href='/'>Logo</Link></h1>
            {
                user ? (
                    <div className=''>
                        <Link href='#' className='p-2 hover:bg-primary-bg hover:text-gray-800' >Home</Link>
                        <Link href='#' className='p-2 hover:bg-primary-bg hover:text-gray-800'>Profile</Link>
                        <Link href='#' className='p-2 hover:bg-primary-bg hover:text-gray-800'>About</Link>
                        <Link href='#' className='p-2 hover:bg-primary-bg hover:text-gray-800'>Info</Link>

                    </div>) : (<div className=''>
                        <Link href='/' className='p-2 hover:bg-primary-bg hover:text-gray-800' >Home</Link>
                        <Link href='/login' className='p-2 hover:bg-primary-bg hover:text-gray-800'>Login</Link>
                        <Link href='/register' className='p-2 hover:bg-primary-bg hover:text-gray-800'>Register</Link>
                        <Link href='#' className='p-2 hover:bg-primary-bg hover:text-gray-800'>Info</Link>

                    </div>)
            }
        </nav>
    )



}

export default Navbar