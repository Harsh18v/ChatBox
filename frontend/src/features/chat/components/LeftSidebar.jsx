import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth/context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import SidebarHeader from './LeftSidebarHeader'
import Searchbar from './Searchbar'
import UserItem from './UserItem'
import EmptySearch from './EmptySearch'



const Sidebar = () => {

    const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages } = useContext(ChatContext)
    const { logout, onlineUsers } = useContext(AuthContext)
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    const filteredUsers = searchQuery
        ? users.filter(user =>
            user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : users

    useEffect(() => {
        getUsers()
    }, [onlineUsers])

    const handleSelectUser = (user) => {
        setSelectedUser(user)
        setUnseenMessages(prev => ({ ...prev, [user._id]: 0 }))
    }

    return (
        <div className={`h-full flex flex-col bg-[#0d0d0d] border-r border-neutral-800
            ${selectedUser ? 'max-md:hidden' : ''}`}>

            <SidebarHeader/>

            <Searchbar value={searchQuery} onChange={setSearchQuery} />

            {/* User list */}
            <div className='flex-1 overflow-y-auto'>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <UserItem
                            key={user._id}
                            user={user}
                            isSelected={selectedUser?._id === user._id}
                            isOnline={onlineUsers.includes(user._id)}
                            unseenCount={unseenMessages[user._id] || 0}
                            onClick={() => handleSelectUser(user)}
                        />
                    ))
                ) : (
                    <EmptySearch />
                )}
            </div>

        </div>
    )
}

export default Sidebar