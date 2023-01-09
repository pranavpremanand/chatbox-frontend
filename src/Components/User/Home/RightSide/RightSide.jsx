import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getNotifications } from '../../../../APIs/Notifications'
import { setNotifications } from '../../../../Redux/NotificationsSlice'
import SearchInput from '../../../Common/SearchInput'
import People from '../../People/People'
import FollowersCard from './FollowersCard/FollowersCard'
import './RightSide.css'

const RightSide = () => {
  return (
    <div className='topDiv'>
      {/* <SearchInput/> */}
      <People/>
      {/* <FollowersCard/> */}
    </div>
  )
}

export default RightSide