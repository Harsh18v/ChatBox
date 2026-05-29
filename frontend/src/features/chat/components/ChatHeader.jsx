import { useEffect, useState } from "react"
import assets from '../../../assets/assets'
import MobileProfileSheet from "./MobileProfilesheet"

function ChatHeader({ selectedUser, onlineUsers, onBack }) {
    const [showProfile, setShowProfile] = useState(false)

    useEffect(() => {
        if (selectedUser && onlineUsers) {
            // Profile sheet mounted
        }
    }, [selectedUser, onlineUsers])


    if (!selectedUser || !onlineUsers) return null
    
    const isOnline = onlineUsers.includes(selectedUser._id)

    return (
        <>
            <div className='flex items-center gap-3 px-5 py-4 border-b border-neutral-800'>

                {/* Back button — mobile only */}
                <button
                    onClick={onBack}
                    className='md:hidden text-neutral-400 hover:text-white transition-colors mr-1'>
                    ←
                </button>

                {/* Avatar — tappable on mobile to open profile */}
                <button
                    onClick={() => setShowProfile(true)}
                    className='relative shrink-0'>
                    <img
                        src={selectedUser.profilePic || assets.avatar_icon}
                        alt={selectedUser.fullName}
                        className='w-9 h-9 rounded-full object-cover'
                    />
                    {isOnline && (
                        <span className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0d0d0d]' />
                    )}
                </button>

                {/* Name + status */}
                <div
                    className='flex-1 cursor-pointer'
                    onClick={() => setShowProfile(true)}>
                    <p className='text-sm font-semibold text-white'>
                        {selectedUser.fullName}
                    </p>
                    <p className={`text-xs ${isOnline ? 'text-emerald-400' : 'text-neutral-600'}`}>
                        {isOnline ? 'Online' : 'Offline'}
                    </p>
                </div>

            </div>

            {/* Mobile profile sheet */}
            {showProfile && (
                <MobileProfileSheet
                    user={selectedUser}
                    isOnline={isOnline}
                    onClose={() => setShowProfile(false)}
                />
            )}
        </>
    )
}

export default ChatHeader