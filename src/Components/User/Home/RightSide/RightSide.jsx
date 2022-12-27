import React from 'react'
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