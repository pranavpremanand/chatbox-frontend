import React from 'react'
import LeftSide from '../../../Components/User/Home/LeftSide/LeftSide'
import RightSide from '../../../Components/User/Home/RightSide/RightSide'
import UserProfile from '../../../Components/User/Profile/Profile'
import './ProfilePage.css'

const ProfilePage = () => {
  return (
    <div className="Main">
      <div className="leftSide">
        <LeftSide />
      </div>
      <div className='profileSide'>
        <UserProfile/>
      </div>
      <div>
        <RightSide/>
      </div>
      </div>
  )
}

export default ProfilePage