import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../auth/context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import Sidebar from '../components/LeftSidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import MobileBottomNav from '../components/MobileBottomNav'

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext)
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const gridCols = selectedUser
    ? 'md:grid-cols-[280px_1fr_280px]'
    : 'md:grid-cols-[280px_1fr]'

  return (
    <div className='w-full h-screen bg-[#0d0d0d] overflow-hidden flex flex-col'>

      <div className={`flex-1 grid grid-cols-1 ${gridCols}`}>
        <Sidebar />
        <ChatContainer />
        {selectedUser && <RightSidebar />}
      </div>

      {/* Mobile bottom nav — hidden on desktop */}
      <MobileBottomNav
        onProfile={() => navigate('/profile')}
        onLogout={logout}
      />

    </div>
  )
}

export default HomePage