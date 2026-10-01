import { LogOutIcon, X } from 'lucide-react'
import React, { useState } from 'react'

const Profile = () => {
  const [formOpen, setFormOpen] = useState(false)
  return (
    <div>
      {/* Profile */}
      <div>
        <button><X /></button>
      </div>
      <div>

      <button>Logout <LogOutIcon /></button>
      </div>
      {
        formOpen && (
          <form>
            <div>
              <h2>Profile Update</h2>
              <button onClick={() => setFormOpen(false)}><X /></button>
            </div>
          </form>
        )
      }
    </div>
  )
}

export default Profile
