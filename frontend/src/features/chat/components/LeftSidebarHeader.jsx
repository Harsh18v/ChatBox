import React from 'react'
import { AuthContext } from '../../auth/context/AuthContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const SidebarHeader = () => {

    const navigate = useNavigate()
    const { logout } = useContext(AuthContext)


    const onNavigateProfile = () => navigate('/profile')


    const onLogout = () => { logout() }

    return (

        <div className='flex items-center justify-between px-5 py-4 border-b border-neutral-800'>

            <span
                className='flex justify-center items-center gap-3 text-sm font-bold tracking-widest uppercase text-white'>
                <div className='w-8 h-8 bg-emerald-400 rounded-xl flex items-center justify-center'>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                ChatBox
            </span>

            <div className='relative group'>
                <button className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-800 transition-colors duration-200'>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="5" r="1.5" fill="#9ca3af" />
                        <circle cx="12" cy="12" r="1.5" fill="#9ca3af" />
                        <circle cx="12" cy="19" r="1.5" fill="#9ca3af" />
                    </svg>
                </button>

                <div className='absolute top-full right-0 mt-1 w-40 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl z-20 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'>
                    <button
                        onClick={onNavigateProfile}
                        className='w-full text-left px-4 py-3 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors duration-150'>
                        Edit Profile
                    </button>
                    <div className='border-t border-neutral-800' />
                    <button
                        onClick={onLogout}
                        className='w-full text-left px-4 py-3 text-sm text-neutral-500 hover:text-white hover:bg-neutral-800 transition-colors duration-150'>
                        Logout
                    </button>
                </div>
            </div>

        </div>
    )
}


export default SidebarHeader
