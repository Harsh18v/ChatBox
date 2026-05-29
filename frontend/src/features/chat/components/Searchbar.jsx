
const Searchbar = ({ value, onChange }) => {


    return (

        <div className='px-4 py-3'>
            <div className='flex items-center gap-2 bg-neutral-900 border border-neutral-800 focus-within:border-neutral-600 rounded-xl px-4 py-2.5 transition-colors duration-200'>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className='shrink-0'>
                    <circle cx="11" cy="11" r="8" stroke="#525252" strokeWidth="2" />
                    {/* <path d="m21 21-4.35-4.35" stroke="#525252" strokeWidth="2" strokeLinecap="round" /> */}
                </svg>
                <input
                    type='text'
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder='Search users...'
                    className='flex-1 bg-transparent text-sm text-white placeholder-neutral-600 outline-none'
                />
            </div>
        </div>
    )
}


export default Searchbar
