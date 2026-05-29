import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './features/chat/pages/HomePage'
import LoginPage from './features/auth/pages/LoginPage'
import ProfilePage from './features/chat/pages/ProfilePage'
import {Toaster} from "react-hot-toast"
import { AuthContext } from './features/auth/context/AuthContext'

const App = () => {
  const { authUser } = useContext(AuthContext)
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />}/>
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />}/>
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />}/>
      </Routes>
    </div>
  )
}

export default App
