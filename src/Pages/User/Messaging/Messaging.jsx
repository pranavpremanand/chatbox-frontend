import React from 'react'
import LeftSide from '../../../Components/User/Home/LeftSide/LeftSide'
import RightSide from '../../../Components/User/Home/RightSide/RightSide'
import { Chat } from '../../../Components/User/Messaging/Chat'

const Messaging = () => {
  return (
    <div className="Main">
      <div className="leftSide">
        <LeftSide />
      </div>
      <div className='chat'>
        <Chat/>
      </div>
      <div>
        <RightSide/>
      </div>
      </div>
  )
}

export default Messaging