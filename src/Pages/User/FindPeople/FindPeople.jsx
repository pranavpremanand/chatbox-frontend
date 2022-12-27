import React from 'react'
import LeftSide from '../../../Components/User/Home/LeftSide/LeftSide'
import RightSide from '../../../Components/User/Home/RightSide/RightSide'
import People from '../../../Components/User/People/People'
import './FindPeople.css'

const FindPeople = () => {
  return (
    <div className="Home">
      <div className="profileSide">
        <LeftSide/>
      </div>
      <div className="People">
        <People />
      </div>
      <div className="rightSide">
        <RightSide />
      </div>
    </div>
  )
}

export default FindPeople