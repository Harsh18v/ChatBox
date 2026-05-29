import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../../../assets/assets'
import { AuthContext } from '../../auth/context/AuthContext'

// ─── Sub-components ───────────────────────────────────────────────────────────

function AvatarUpload({ authUser, selectedImg, onChange }) {
    const preview = selectedImg
        ? URL.createObjectURL(selectedImg)
        : authUser?.profilePic || assets.avatar_icon

    return (
        <label htmlFor='avatar' className='group cursor-pointer relative w-24 h-24 mx-auto block'>

            <input
                type='file'
                id='avatar'
                accept='.png, .jpg, .jpeg'
                onChange={(e) => onChange(e.target.files[0])}
                hidden
            />

            {/* Avatar image */}
            <img
                src={preview}
                alt={authUser?.fullName}
                className='w-24 h-24 rounded-full object-cover border-2 border-neutral-800 group-hover:border-emerald-500 transition-colors duration-200'
            />

            {/* Overlay on hover */}
            <div className='absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center'>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
                        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="13" r="4"
                        stroke="white" strokeWidth="2"/>
                </svg>
            </div>

        </label>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────

const ProfilePage = () => {
    const { authUser, updateProfile } = useContext(AuthContext)
    const navigate = useNavigate()

    const [selectedImg, setSelectedImg] = useState(null)
    const [name, setName] = useState(authUser.fullName)
    const [bio, setBio] = useState(authUser.bio)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!selectedImg) {
            await updateProfile({ fullName: name, bio })
            navigate('/')
            return
        }

        const reader = new FileReader()
        reader.readAsDataURL(selectedImg)
        reader.onload = async () => {
            await updateProfile({
                profilePic: reader.result,
                fullName: name,
                bio
            })
            navigate('/')
        }
    }

    return (
        <div className='min-h-screen bg-[#0d0d0d] flex items-center justify-center px-6'>

            <div className='w-full max-w-md'>

                {/* Back button */}
                <button
                    onClick={() => navigate('/')}
                    className='flex items-center gap-2 text-xs text-neutral-600 hover:text-white transition-colors duration-200 mb-8'>
                    <span>←</span> Back to chats
                </button>

                {/* Header */}
                <div className='mb-8'>
                    <h1
                        className='text-3xl font-bold text-white tracking-tight mb-2'
                        style={{ fontFamily: "'Syne', sans-serif" }}>
                        Your profile
                    </h1>
                    <p className='text-sm text-neutral-500'>
                        Update your name, bio and profile picture
                    </p>
                </div>

                {/* Avatar upload */}
                <div className='flex flex-col items-center mb-8'>
                    <AvatarUpload
                        authUser={authUser}
                        selectedImg={selectedImg}
                        onChange={setSelectedImg}
                    />
                    <p className='text-xs text-neutral-600 mt-3'>
                        Click to change photo
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-neutral-400'>
                            Full Name
                        </label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Your name'
                            required
                            className='w-full h-11 bg-neutral-900 border border-neutral-800 focus:border-emerald-500 rounded-xl px-4 text-sm text-white placeholder-neutral-600 outline-none transition-colors duration-200'
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-neutral-400'>
                            Bio
                        </label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder='Tell people a little about yourself...'
                            rows={4}
                            className='w-full bg-neutral-900 border border-neutral-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none resize-none transition-colors duration-200'
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-full mt-2 h-11 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-black font-semibold text-sm rounded-xl tracking-wide transition-all duration-200'>
                        Save changes
                    </button>

                </form>

            </div>
        </div>
    )
}

export default ProfilePage