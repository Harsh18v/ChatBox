import assets from '../../../assets/assets'

//only visible to mobile users

function MobileProfileSheet({ user, isOnline, onClose }) {


    return (
        <>

            <div
                onClick={onClose}
                className='md:hidden fixed inset-0 bg-black/60 z-40'
            />

            <div className='md:hidden fixed bottom-0 left-0 right-0 bg-[#111111] border-t border-neutral-800 rounded-t-2xl z-50 px-6 py-18 flex flex-col items-center gap-4'>

                <div className='absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-neutral-700 rounded-full' />

                <div className='relative'>
                    <img
                        src={user.profilePic || assets.avatar_icon}
                        alt={user.fullName}
                        className='w-20 h-20 rounded-full object-cover border-2 border-neutral-800'
                    />
                    {isOnline && (
                        <span className='absolute bottom-1 right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#111111]' />
                    )}
                </div>

                <div className='text-center'>
                    <h2
                        className='text-white font-semibold text-lg'
                        style={{ fontFamily: "'Syne', sans-serif" }}>
                        {user.fullName}
                    </h2>
                    <p className={`text-xs mt-1 ${isOnline ? 'text-emerald-400' : 'text-neutral-600'}`}>
                        {isOnline ? 'Online' : 'Offline'}
                    </p>
                </div>

                {user.bio && (
                    <p className='text-sm text-neutral-500 text-center leading-relaxed max-w-xs'>
                        {user.bio}
                    </p>
                )}

                <button
                    onClick={onClose}
                    className='w-full h-11 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white text-sm rounded-xl transition-all duration-200 mt-2'>
                    Close
                </button>

            </div>
        </>
    )
}

export default MobileProfileSheet