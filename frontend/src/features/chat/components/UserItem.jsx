import React from 'react'
import assets from '../../../assets/assets'


const UserItem = ({ user, isSelected, isOnline, unseenCount, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-150 relative
                ${isSelected
                    ? 'bg-neutral-800'
                    : 'hover:bg-neutral-900'
                }`}>

            {/* Avatar with online dot */}
            <div className='relative shrink-0'>
                <img
                    src={user.profilePic || assets.avatar_icon}
                    alt={user.fullName}
                    className='w-10 h-10 rounded-full object-cover'
                />
                {isOnline && (
                    <span className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0d0d0d]' />
                )}
            </div>

            {/* Name + status */}
            <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-white truncate'>
                    {user.fullName}
                </p>
                <p className={`text-xs mt-0.5 ${isOnline ? 'text-emerald-400' : 'text-neutral-600'}`}>
                    {isOnline ? 'Online' : 'Offline'}
                </p>
            </div>

            {/* Unseen badge */}
            {unseenCount > 0 && (
                <span className='w-5 h-5 bg-emerald-500 text-black text-xs font-bold rounded-full flex items-center justify-center shrink-0'>
                    {unseenCount}
                </span>
            )}

        </div>
    )
}

export default UserItem
