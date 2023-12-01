import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Navbar() {
    const { user } = useAuth()
    return (
        <nav className='flex justify-between items-center bg-slate-900 text-primary-text p-2'>
            <h1><Link to='/'>Logo</Link></h1>
            {
                user?.user_id ? (
                    <div className=''>
                        <Link to='/' className='p-2 hover:bg-primary-bg hover:text-gray-800' >Home</Link>
                        <Link to='/profile' className='p-2 hover:bg-primary-bg hover:text-gray-800'>Profile</Link>
                        <Link to='#' className='p-2 hover:bg-primary-bg hover:text-gray-800'>About</Link>
                        <Link to='#' className='p-2 hover:bg-primary-bg hover:text-gray-800'>Info</Link>
                        <Link to='/logout' className='p-2 hover:bg-primary-bg hover:text-gray-800'>logout</Link>

                    </div>) : (<div className=''>
                        <Link to='/' className='p-2 hover:bg-primary-bg hover:text-gray-800' >Home</Link>
                        <Link to='/login' className='p-2 hover:bg-primary-bg hover:text-gray-800'>Login</Link>
                        <Link to='/register' className='p-2 hover:bg-primary-bg hover:text-gray-800'>Register</Link>
                        <Link to='#' className='p-2 hover:bg-primary-bg hover:text-gray-800'>Info</Link>

                    </div>)
            }
        </nav>
    )



}

export default Navbar