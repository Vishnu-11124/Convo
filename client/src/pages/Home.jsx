
import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatSection from '../components/ChatSection'
import RightSidebar from '../components/RightSidebar'
import Navbar from '../components/Navbar'


const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null)
  const [showRightSidebar, setShowRightSidebar] = useState(false)

  return (
    <div className="h-screen w-full overflow-hidden bg-[#0F172A] text-[#F8FAFC]">

      <div className="flex h-full w-full">

        {/* Left Section */}
        <aside
          className={`
            w-full shrink-0 bg-[#0F172A]
            md:w-[340px]
            ${selectedUser ? 'hidden md:block' : 'block'}
          `}
        >
          {/* Navbar only belongs to Sidebar */}
          <div className="h-16 border-b border-[#334155]">
            <Navbar />
          </div>

          {/* Chat List */}
          <div className="h-[calc(100vh-64px)] overflow-y-auto">
            <Sidebar onSelectUser={setSelectedUser} />
          </div>
        </aside>

        {/* Chat Section */}
        <main
          className={`
            min-w-0 flex-1
            ${selectedUser ? 'block' : 'hidden md:block'}
          `}
        >
          <ChatSection
            user={selectedUser}
            onBack={() => setSelectedUser(null)}
            onUserClick={() => setShowRightSidebar(true)}
          />
        </main>

        {/* Right Sidebar */}
        {showRightSidebar && (
          <aside className="hidden w-[300px] shrink-0 border-l border-[#334155] bg-[#1E293B] lg:block">
            <RightSidebar
              user={selectedUser}
              onClose={() => setShowRightSidebar(false)}
            />
          </aside>
        )}

      </div>
    </div>
  )
}

export default Home

