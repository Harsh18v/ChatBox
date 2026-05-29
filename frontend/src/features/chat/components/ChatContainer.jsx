import React, { useContext, useEffect, useRef, useState } from 'react'
import assets from '../../../assets/assets'
import { formatMessageTime } from '../../../lib/utils'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../../auth/context/AuthContext'
import toast from 'react-hot-toast'
import ChatHeader from './ChatHeader'
import EmptyState from './EmptyState'



// ─── Sub-components ───────────────────────────────────────────────────────────


function MessageBubble({ msg, isMine, authUser, selectedUser }) {
    return (
        <div className={`flex items-end gap-2 ${isMine ? 'justify-end' : 'justify-start'}`}>

            {/* Their avatar — left side */}
            {!isMine && (
                <img
                    src={selectedUser?.profilePic || assets.avatar_icon}
                    alt=''
                    className='w-6 h-6 rounded-full object-cover mb-5 shrink-0'
                />
            )}

            <div className={`flex flex-col gap-1 max-w-[60%] ${isMine ? 'items-end' : 'items-start'}`}>
                {msg.image ? (
                    <img
                        src={msg.image}
                        alt='shared'
                        className='rounded-2xl max-w-full border border-neutral-800'
                    />
                ) : (
                    <p className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed wrap-break-word
                        ${isMine
                            ? 'bg-emerald-500 text-black rounded-br-sm'
                            : 'bg-neutral-800 text-white rounded-bl-sm'
                        }`}>
                        {msg.text}
                    </p>
                )}
                <p className='text-xs text-neutral-600 px-1'>
                    {formatMessageTime(msg.createdAt)}
                </p>
            </div>

            {/* My avatar — right side */}
            {isMine && (
                <img
                    src={authUser?.profilePic || assets.avatar_icon}
                    alt=''
                    className='w-6 h-6 rounded-full object-cover mb-5 shrink-0'
                />
            )}

        </div>
    )
}



// ─── Main Component ───────────────────────────────────────────────────────────

const ChatContainer = () => {
    const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext)
    const { authUser, onlineUsers } = useContext(AuthContext)

    const scrollEnd = useRef()
    const messagesContainerRef = useRef(null)
    const [isAtBottom, setIsAtBottom] = useState(true)
    const [input, setInput] = useState('')

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!input.trim()) return
        await sendMessage({ text: input.trim() })
        setInput('')
    }

    const handleSendImage = async (e) => {
        const file = e.target.files[0]
        if (!file || !file.type.startsWith('image/')) {
            toast.error('Please select an image file')
            return
        }
        const reader = new FileReader()
        reader.onloadend = async () => {
            await sendMessage({ image: reader.result })
            e.target.value = ''
        }
        reader.readAsDataURL(file)
    }

    const handleScroll = () => {
        const container = messagesContainerRef.current
        if (!container) return

        const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight
        setIsAtBottom(distanceFromBottom < 50)
    }


    if (!selectedUser) return <EmptyState />

    return (
        <div className='h-full flex flex-col bg-[#0d0d0d]'>

            <ChatHeader
                selectedUser={selectedUser}
                onlineUsers={onlineUsers}
                onBack={() => setSelectedUser(null)}
            />

            {/* Messages area */}
            <div className='flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4'>
                {messages.map((msg, index) => (
                    <MessageBubble
                        key={index}
                        msg={msg}
                        isMine={msg.senderId === authUser._id}
                        authUser={authUser}
                        selectedUser={selectedUser}
                    />
                ))}
                <div ref={scrollEnd} />
            </div>

            {/* Input area */}
            <div className='px-4 py-3 border-t border-neutral-800'>
                <form
                    onSubmit={handleSendMessage}
                    className='flex items-center gap-3'>

                    <div className='flex-1 flex items-center gap-2 bg-neutral-900 border border-neutral-800 focus-within:border-neutral-600 rounded-xl px-4 py-2.5 transition-colors duration-200'>
                        <input
                            type='text'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(e)}
                            placeholder='Type a message...'
                            className='flex-1 bg-transparent text-sm text-white placeholder-neutral-600 outline-none'
                        />

                        {/* Image upload */}
                        <input
                            type='file'
                            id='image'
                            accept='image/png, image/jpeg'
                            onChange={handleSendImage}
                            hidden
                        />
                        <label
                            htmlFor='image'
                            className='text-neutral-600 hover:text-neutral-300 cursor-pointer transition-colors'>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                                <polyline points="21 15 16 10 5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </label>
                    </div>

                    {/* Send button */}
                    <button
                        type='submit'
                        disabled={!input.trim()}
                        className='w-10 h-10 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 shrink-0'>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <line x1="22" y1="2" x2="11" y2="13" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                </form>
            </div>

        </div>
    )
}

export default ChatContainer