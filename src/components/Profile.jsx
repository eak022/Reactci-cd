import React from 'react'

const Profile = () => {
  return (
    <div><div className="navbar bg-base-100 shadow-sm">
   
    
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-sm">
          <div className="w-10 rounded-full">
           <button className='btn  bg-primary text-white rounded-xl'> User</button>
          </div>
        </div>
        <ul
          tabIndex={0}
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default Profile