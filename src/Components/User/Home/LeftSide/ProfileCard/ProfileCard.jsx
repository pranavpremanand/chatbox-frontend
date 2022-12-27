import { Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import React from "react";
import './ProfileCard.css'

function ProfileCard() {
  return (
    <div className="profileCard">
      <div className='profileImages'>
        {/* <img src={Cover} alt=''/>
        <img src={Profile} alt=''/> */}
      </div>
      <div className='profileName'>
        <Typography sx={{fontSize:'medium',fontWeight:'bold'}}>Pranav</Typography>
        <Typography sx={{fontSize:'small',fontWeight:'medium'}}>Status</Typography>
      </div>
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <Typography sx={{fontSize:'small',fontWeight:'800'}}>100 </Typography>
            <Typography sx={{fontSize:'small',fontWeight:'500'}}>Followings</Typography>
          </div>
          <div className='vl'></div>
          <div className='follow'>
            <Typography sx={{fontSize:'small',fontWeight:'800'}}>1 </Typography>
            <Typography sx={{fontSize:'small',fontWeight:'500'}}>Followers</Typography>
          </div>
        </div>
        <hr />
      </div>
      <Typography sx={{marginBottom:2,fontSize:'medium',fontWeight:'bold',color:teal[500],alignSelf:'center'}}>My Profile</Typography>
    </div>
  );
}

export default ProfileCard;
