import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatSection from '../components/ChatSection'
import RightSidebar from '../components/RightSidebar'

const Home = () => {
    const [userSelected, setUserSelected] = useState(false)
  return (
    <div>
      <div>
        <Sidebar />
        <ChatSection />
        <RightSidebar />
      </div>
    </div>
  )
}

export default Home
