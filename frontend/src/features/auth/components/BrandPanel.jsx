import React from 'react'

const BrandPanel = () => {

    return (
        <>
            {/* Desktop — left branding panel */}
            <div className='hidden md:flex flex-col justify-center px-16 py-12 flex-1 max-w-lg'>
                <div className='w-12 h-12 bg-emerald-400 rounded-2xl flex items-center justify-center mb-10'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <h1
                    className='text-5xl font-bold text-white leading-tight mb-4'>
                    ChatNest
                </h1>

                <p className='text-xl text-neutral-300 leading-relaxed max-w-md mb-2'>
                    Real-Time Chats, Real Connections.
                </p>

                <p className='text-neutral-500 leading-relaxed max-w-xs'>
                    Fast, simple messaging. Connect with anyone, instantly.
                </p>

            </div>

            {/* Mobile — compact top bar */}
            <div className='flex md:hidden items-center justify-center gap-3 pt-12 pb-4'>
                <div className='w-9 h-9 bg-emerald-400 rounded-xl flex items-center justify-center'>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <span
                    className='text-2xl font-bold text-white'>
                    ChatBox
                </span>
            </div>
        </>
    )
}


export default BrandPanel
