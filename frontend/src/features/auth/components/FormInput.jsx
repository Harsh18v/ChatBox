import React from 'react'

const FormInput = ({ type = 'text', placeholder, value, onChange, autoFocus }) => {

    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoFocus={autoFocus}
            required
            className='w-full h-11 bg-neutral-900 border border-neutral-800 rounded-lg px-4 text-sm text-white placeholder-neutral-600 outline-none transition-colors duration-200'
        />
    )
}


export default FormInput
