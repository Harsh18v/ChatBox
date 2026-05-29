import React from 'react'

const EmptyState = () => {
    return (
        <div className='flex flex-col items-center justify-center gap-3 h-full text-center px-8 max-md:hidden'>
            <div className='w-14 h-14 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        stroke="#404040" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <p className='text-sm font-medium text-neutral-400'>
                Select a conversation
            </p>
            <p className='text-xs text-neutral-600'>
                Choose someone from the sidebar to start chatting
            </p>
        </div>
    )
}


export default EmptyState
