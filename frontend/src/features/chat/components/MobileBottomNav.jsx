import React, { useContext } from 'react'

// this bottom navbar only appears to mobile users

const MobileBottomNav = ({ onProfile, onLogout }) => {


    return (
        <div className='md:hidden fixed bottom-0 left-0 right-0 bg-[#111111] border-t border-neutral-800 flex items-center justify-around px-6 py-3 z-50'>

            {/* Chats tab */}
            <button className='flex flex-col items-center gap-1'>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className='text-xs text-emerald-400'>Chats</span>
            </button>

            {/* Profile tab */}
            <button
                onClick={onProfile}
                className='flex flex-col items-center gap-1'>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                        stroke="#525252" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="7" r="4"
                        stroke="#525252" strokeWidth="2" />
                </svg>
                <span className='text-xs text-neutral-600'>Profile</span>
            </button>

            {/* Logout */}
            <button
                onClick={onLogout}
                className='flex flex-col items-center gap-1'>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                        stroke="#525252" strokeWidth="2" strokeLinecap="round" />
                    <polyline points="16 17 21 12 16 7"
                        stroke="#525252" strokeWidth="2" strokeLinecap="round" />
                    <line x1="21" y1="12" x2="9" y2="12"
                        stroke="#525252" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className='text-xs text-neutral-600'>Logout</span>
            </button>

        </div>
    )
}

export default MobileBottomNav
