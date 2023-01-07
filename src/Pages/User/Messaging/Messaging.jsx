import React from 'react'
import LeftSide from '../../../Components/User/Home/LeftSide/LeftSide'
import RightSide from '../../../Components/User/Home/RightSide/RightSide'
import { Chat, ChatComponent } from '../../../Components/User/Messaging/Chat'

const Messaging = () => {
  return (
    <div className="Main">
      <div className="leftSide">
        <LeftSide />
      </div>
      <div className='chat'>
        {/* <Chat/> */}
        <ChatComponent/>
      </div>
      <div>
        <RightSide/>
      </div>
      </div>
  )
}

export default Messaging