import React from "react";
import FollowersCard from "../RightSide/FollowersCard/FollowersCard";
import "./LeftSide.css";
import LogoSide from "./LogoSearch/LogoSearch";
import ProfileCard from "./ProfileCard/ProfileCard";
import Options from "../../../Common/Options/Options";

const LeftSide = () => {
  return (
    <div className="profileSide" style={{ minHeight: "100vh" }}>
      <LogoSide />
      <Options/>
      {/* <ProfileCard /> */}
      {/* <FollowersCard/> */}
    </div>
  ); 
};

export default LeftSide;
