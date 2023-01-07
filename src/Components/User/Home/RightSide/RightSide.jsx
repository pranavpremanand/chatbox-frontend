import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getNotifications } from '../../../../APIs/Notifications'
import { setNotifications } from '../../../../Redux/NotificationsSlice'
import SearchInput from '../../../Common/SearchInput'
import People from '../../People/People'
import FollowersCard from './FollowersCard/FollowersCard'
import './RightSide.css'

const RightSide = () => {
  const dispatch = useDispatch()
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('user'))
  //   // console.log('user',user)
  //   console.log('mounting')
  //   getNotificationsData();
  //   return console.log('unmounting')
  // },[]);
  // const getNotificationsData = async () => {
  //   const { data } = await getNotifications();
  //   dispatch(setNotifications({ notifications: data }));
  // };
  return (
    <div className='topDiv'>
      {/* <SearchInput/> */}
      <People/>
      {/* <FollowersCard/> */}
    </div>
  )
}

export default RightSide