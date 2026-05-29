import React, { useContext, useEffect, useState } from 'react'
import assets from '../../../assets/assets'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../../auth/context/AuthContext'

// ─── Sub-components ───────────────────────────────────────────────────────────

function UserProfile({ selectedUser, isOnline }) {
    return (
        <div className='flex flex-col items-center gap-3 px-6 pt-10 pb-6'>

            {/* Avatar with online indicator */}
            <div className='relative'>
                <img
                    src={selectedUser.profilePic || assets.avatar_icon}
                    alt={selectedUser.fullName}
                    className='w-20 h-20 rounded-full object-cover border-2 border-neutral-800'
                />
                {isOnline && (
                    <span className='absolute bottom-1 right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#111111]' />
                )}
            </div>

            {/* Name */}
            <div className='text-center'>
                <h2 className='text-white font-semibold text-base'
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                    {selectedUser.fullName}
                </h2>
                <p className={`text-xs mt-1 ${isOnline ? 'text-emerald-400' : 'text-neutral-600'}`}>
                    {isOnline ? 'Online' : 'Offline'}
                </p>
            </div>

            {/* Bio */}
            {selectedUser.bio && (
                <p className='text-xs text-neutral-500 text-center leading-relaxed max-w-45'>
                    {selectedUser.bio}
                </p>
            )}

        </div>
    )
}

function MediaGrid({ images }) {
    if (!images.length) {
        return (
            <p className='text-xs text-neutral-700 text-center py-4'>
                No media shared yet
            </p>
        )
    }

    return (
        <div className='grid grid-cols-2 gap-2'>
            {images.map((url, index) => (
                <img
                    key={index}
                    src={url}
                    alt='shared media'
                    onClick={() => window.open(url)}
                    className='w-full aspect-square object-cover rounded-lg cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-200'
                />
            ))}
        </div>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────

const RightSidebar = () => {
    const { selectedUser, messages } = useContext(ChatContext)
    const { logout, onlineUsers } = useContext(AuthContext)
    const [msgImages, setMsgImages] = useState([])

    // Extract images from messages whenever messages change
    useEffect(() => {
        setMsgImages(
            messages.filter(msg => msg.image).map(msg => msg.image)
        )
    }, [messages])

    if (!selectedUser) return null

    const isOnline = onlineUsers.includes(selectedUser._id)

    return (
        <div className='h-full flex flex-col bg-[#111111] border-l border-neutral-800 overflow-y-auto max-md:hidden'>

            {/* Profile section */}
            <UserProfile selectedUser={selectedUser} isOnline={isOnline} />

            {/* Divider */}
            <div className='border-t border-neutral-800 mx-5' />

            {/* Media section */}
            <div className='flex-1 px-5 py-5 flex flex-col gap-3'>
                <div className='flex items-center justify-between'>
                    <p className='text-xs text-neutral-500 uppercase tracking-widest'>
                        Media
                    </p>
                    <p className='text-xs text-neutral-700'>
                        {msgImages.length} files
                    </p>
                </div>

                <MediaGrid images={msgImages} />
            </div>


        </div>
    )
}

export default RightSidebar