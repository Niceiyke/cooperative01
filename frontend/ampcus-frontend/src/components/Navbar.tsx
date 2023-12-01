import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AiOutlineMenu } from 'react-icons/ai';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';

function Navbar() {
    const { refreshToken } = useAuth()


    const refresh: JwtPayload = jwtDecode(refreshToken)
    let isExpired: boolean

    if (refresh) {

        isExpired = dayjs.unix(refresh.exp).diff(dayjs()) < 1
    }
    else {
        isExpired = true
    }

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <nav className='navbar hidden md:flex justify-between items-center'>
                <h1>
                    <Link to='/dashboard'>AMPUCS</Link>
                </h1>
                {!isExpired ? (
                    <div className=''>
                        <Link to='/dashboard' className='p-2 hover:bg-primary-bg hover:text-gray-800'>
                            Home
                        </Link>
                        <Link to='/profile' className='p-2 hover:bg-primary-bg hover:text-gray-800'>
                            Profile
                        </Link>
                        <Link to='#' className='p-2 hover:bg-primary-bg hover:text-gray-800'>
                            About
                        </Link>
                        <Link to='#' className='p-2 hover:bg-primary-bg hover:text-gray-800'>
                            Info
                        </Link>
                        <Link to='/logout' className='p-2 hover:bg-primary-bg hover:text-gray-800'>
                            Logout
                        </Link>
                    </div>
                ) : (
                    <div className=''>
                        <Link to='/' className='p-2 hover:bg-primary-bg hover:text-gray-800'>
                            Home
                        </Link>
                        <Link to='/login' className='p-2 hover:bg-primary-bg hover:text-gray-800'>
                            Login
                        </Link>
                        <Link to='/register' className='p-2 hover:bg-primary-bg hover:text-gray-800'>
                            Register
                        </Link>
                        <Link to='#' className='p-2 hover:bg-primary-bg hover:text-gray-800'>
                            Info
                        </Link>
                    </div>
                )}
            </nav>

            {/* Mobile Responsive Menu */}
            <div className='md:hidden flex justify-end items-center' onClick={toggleMobileMenu}>
                <AiOutlineMenu />
            </div>

            {/* Mobile Navigation Links */}
            {isMobileMenuOpen && (
                <div className='md:hidden'>
                    {/* Include your mobile navigation links here */}
                    <Link to='/' className='block p-2 hover:bg-primary-bg hover:text-gray-800'>
                        Home
                    </Link>
                    <Link to='/dashboard' className='block p-2 hover:bg-primary-bg hover:text-gray-800'>
                        Dashboard
                    </Link>
                    <Link to='/profile' className='block p-2 hover:bg-primary-bg hover:text-gray-800'>
                        Profile
                    </Link>
                    <Link to='/logout' className='p-2 hover:bg-primary-bg hover:text-gray-800'>
                        Logout
                    </Link>
                    {/* Add other mobile navigation links as needed */}
                </div>
            )}
        </>
    );
}

export default Navbar;
