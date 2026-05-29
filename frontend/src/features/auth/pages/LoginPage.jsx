import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import BrandPanel from '../components/BrandPanel'
import FormInput from '../components/FormInput'


const VIEWS = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  BIO: 'bio',
}


const LoginPage = () => {
  const [view, setView] = useState(VIEWS.SIGNUP)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')

  const { login } = useContext(AuthContext)

  const isLogin = view === VIEWS.LOGIN

  const handleSubmit = (e) => {
    e.preventDefault()

    // Sign up is two steps — basic info first, then bio
    if (view === VIEWS.SIGNUP) {
      setView(VIEWS.BIO)
      return
    }

    login(
      isLogin ? 'login' : 'signup',
      { fullName, email, password, bio }
    )
  }

  const switchToLogin = () => {
    setView(VIEWS.LOGIN)
    setFullName('')
    setEmail('')
    setPassword('')
    setBio('')
  }

  const switchToSignup = () => {
    setView(VIEWS.SIGNUP)
    setFullName('')
    setEmail('')
    setPassword('')
    setBio('')
  }

  const goBackFromBio = () => setView(VIEWS.SIGNUP)

  return (
    <div className='min-h-screen bg-[#0d0d0d] flex flex-col md:flex-row'>

      <BrandPanel />

      {/* Right — Form */}
      <div className='flex-1 flex items-center justify-center px-6 py-12'>
        <div className='w-full max-w-sm'>

          {/* Header */}
          <div className='mb-8'>
            {view === VIEWS.BIO ? (
              <>
                <button
                  type='button'
                  onClick={goBackFromBio}
                  className='flex items-center gap-2 text-xs text-neutral-600 hover:text-white transition-colors mb-6'>
                  <span>←</span> Back
                </button>
                <h2
                  className='text-3xl font-bold text-white tracking-tight mb-2'>
                  One last thing
                </h2>
                <p className='text-sm text-neutral-500'>
                  Tell people a little about yourself
                </p>
              </>
            ) : (
              <>
                <h2
                  className='text-3xl font-bold text-white tracking-tight mb-2'>
                  {isLogin ? 'Welcome back' : 'Create account'}
                </h2>
                <p className='text-sm text-neutral-500'>
                  {isLogin
                    ? 'Sign in to continue chatting'
                    : 'Start chatting in seconds'}
                </p>
              </>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

            {/* Bio step */}
            {view === VIEWS.BIO && (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder='e.g. Designer from Mumbai, love talking tech...'
                rows={4}
                className='w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none resize-none transition-colors duration-200'
              />
            )}

            {/* Signup fields */}
            {view === VIEWS.SIGNUP && (
              <FormInput
                placeholder='Full Name'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoFocus
              />
            )}

            {/* Shared fields — email + password */}
            {view !== VIEWS.BIO && (
              <>
                <FormInput
                  type='email'
                  placeholder='Enter your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormInput
                  type='password'
                  placeholder='••••••••'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </>
            )}

            {/* Submit */}
            <button
              type='submit'
              className='w-full mt-2 h-11 bg-emerald-500 active:scale-[0.98] text-black font-semibold text-sm rounded-lg tracking-wide transition-all duration-200'>
              {view === VIEWS.LOGIN && 'Sign in'}
              {view === VIEWS.SIGNUP && 'Continue'}
              {view === VIEWS.BIO && 'Create account'}
            </button>

          </form>

          {/* Footer toggle */}
          {view !== VIEWS.BIO && (
            <p className='mt-6 text-center text-sm text-neutral-500'>
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type='button'
                onClick={isLogin ? switchToSignup : switchToLogin}
                className='text-white font-semibold hover:underline underline-offset-2'>
                {isLogin ? 'Create one' : 'Sign in'}
              </button>
            </p>
          )}

        </div>
      </div>

    </div>
  )
}

export default LoginPage