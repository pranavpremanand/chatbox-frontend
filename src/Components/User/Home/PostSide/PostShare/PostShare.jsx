import React, { useState, useRef } from "react";
import "./PostShare.css";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import { blue } from "@mui/material/colors";
import { Avatar, Button } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import axios from "../../../../../APIs/UserAPI";
import Axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { DefaultProfile } from "../../../../../Data/DefaultProfile";

const PostShare = ({ getPosts }) => {
  const [img, setImg] = useState("");
  const [formData, setFormData] = useState("");
  const [postData, setPostData] = useState({ image: "", description: "" });
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const imgRef = useRef();

  const onImgChange = (file) => {
    console.log("file", file.target.files[0]);
    const fData = new FormData();
    fData.append("file", file.target.files[0]);
    fData.append("upload_preset", "aiaeajln");
    console.log("HEYY", fData);
    setFormData(fData);
    if (file.target.files && file.target.files[0]) {
      let image = file.target.files[0];
      setImg({ image: URL.createObjectURL(image) });
    }
  };

  //When clicking share button
  const uploadPost = async () => {
    let image;
    if (img) {
      const response = await Axios.post(
        "https://api.cloudinary.com/v1_1/dxlmn8skp/image/upload",
        formData
      );
      if (response.data) {
        image = response.data.secure_url;
      }
    }
    await axios
      .post("/user/upload-post", { postData, image })
      .then((response) => {
        toast("Post uploaded", {
          // icon: "✔",
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        console.log("USERSINFO", userInfo);
        const posts = {
          description: postData.description,
          image: image,
          likedUsers: [],
        };
        // dispatch(postsNull())
        getPosts();
        setImg(null);
        setPostData({ description: "" });
      })
      .catch((err) =>
        toast("Something went wrong, try again", {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        })
      );
  };

  return (
    <div
      className="postShare"
      style={{ display: "flex", alignItems: "center" }}
    >
      {/* <div><Avatar src={userInfo.profilePic} alt={`${userInfo.fullName} `}/></div> */}
      {userInfo.profilePic ?
        <div
          style={{
            backgroundImage: `url(${userInfo.profilePic})`,
            width: "3.5rem",
            height: "3.5rem",
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "50%",
          }}
        ></div>:
        <img src={DefaultProfile} alt="" />
      }
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <input
            onChange={(e) => setPostData({ description: e.target.value })}
            type="text"
            placeholder="What's happening..."
            value={postData.description}
          />
          <div
            className="postOptions"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Button onClick={() => imgRef.current.click()}
                sx={{
                  // color: purple[600],
                  backgroundColor: blue[600],
                  fontSize: "small",
                  marginBottom: "1rem"
                }}
                size='small'
                variant='contained'
                startIcon={<ImageRoundedIcon />}
                className="option text-capitalize"
                >Photo
            </Button>
            {/* <div>
            <Typography
              sx={{ color: purple[700], fontSize: "small" }}
              className="option"
            >
              <PlayCircleFilledRoundedIcon />
              Video
            </Typography>
          </div> */}
            {/* <div>
            <Typography
              sx={{ color: purple[700], fontSize: "small" }}
              className="option"
            >
              <LocationOnRoundedIcon />
              Location
            </Typography>
          </div> */}
            {/* <div>
            <Typography
              sx={{ color: purple[700], fontSize: "small" }}
              className="option"
            >
              <CalendarMonthRoundedIcon />
              Schedule 
            </Typography>
          </div> */}
            {/* <div className="postOptions"></div> */}
            <Button
              variant="contained"
              sx={{ textTransform: "capitalize", backgroundColor: blue[600]  }}
              // color="secondary"
              onClick={uploadPost}
              size="small"
              // sx={{ backgroundColor: teal[700] }}
              className="btn btn-sm text-white"
            >
              Share
            </Button>
          </div>
        </div>
        <div style={{ display: "none" }}>
          <input
            name="myImg"
            onChange={
              (e) => onImgChange(e)
              // (e)=>setFormData(e.target.files[0])
            }
            ref={imgRef}
            type="file"
          />
        </div>
        {img && (
          <div className="previewImg">
            <CloseRoundedIcon
              sx={{ cursor: "pointer" }}
              onClick={() => setImg(null)}
            />
            <img src={img.image} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
