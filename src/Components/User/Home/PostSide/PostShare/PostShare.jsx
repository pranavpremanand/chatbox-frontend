import React, { useState, useRef, useContext } from "react";
import "./PostShare.css";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import { blue } from "@mui/material/colors";
import { Avatar, Button } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import axios from "../../../../../APIs/UserAuthAPI";
import Axios from "axios";
import { toast } from "react-hot-toast";
import { LoadingContext } from "../../../../Context";

const PostShare = ({ getPosts }) => {
  const [img, setImg] = useState("");
  const [formData, setFormData] = useState("");
  const [postData, setPostData] = useState({ image: "", description: "" });
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const imgRef = useRef();
  const { setIsLoading } = useContext(LoadingContext);

  const onImgChange = (file) => {
    const fData = new FormData();
    fData.append("file", file.target.files[0]);
    fData.append("upload_preset", "aiaeajln");
    setFormData(fData);
    if (file.target.files && file.target.files[0]) {
      if (
        file.target.files[0].type === "image/x-png" ||
        file.target.files[0].type === "image/gif" ||
        file.target.files[0].type === "image/jpeg" ||
        file.target.files[0].type === "image/jpg"
      ) {
        let img = file.target.files[0];
        setImg({ image: URL.createObjectURL(img) });
      } else {
        toast("Select an image file", {
          icon: "❌",
          position: "top-center",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    }
  };

  //When clicking share button
  const uploadPost = async () => {
    let image;
    if (img) {
      setIsLoading(true);
      const response = await Axios.post(
        "https://api.cloudinary.com/v1_1/dxlmn8skp/image/upload",
        formData
      );
      if (response.data) {
        image = response.data.secure_url;
      }

      await axios
        .post("/user/upload-post", { postData, image })
        .then(() => {
          toast("Post uploaded", {
            icon: "✅",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          getPosts();
          setImg(null);
          setPostData({ description: "" });
          setIsLoading(false);
        })
        .catch((err) => {
          toast("Something went wrong, try again", {
            icon: "❌",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          setIsLoading(false);
        });
    } else {
      toast("Select a picture to post", {
        icon: "❌",
        position: "top-center",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div
      className="postShare"
      style={{ display: "flex", alignItems: "center" }}
    >
      <div
        style={{
          width: "3.5rem",
          height: "3.5rem",
        }}
      >
        <Avatar
          sx={{ width: "3.5rem", height: "3.5rem" }}
          src={userInfo.profilePic}
          alt={`${userInfo.fullName} `}
        />
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <input
            onChange={(e) =>
              img &&
              e.target.value !== " " &&
              setPostData({ description: e.target.value })
            }
            type="text"
            placeholder="Type something about your post..."
            value={postData.description}
          />
          <div
            className="postOptions"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Button
              onClick={() => imgRef.current.click()}
              sx={{
                backgroundColor: blue[600],
                fontSize: "small",
                marginBottom: "1rem",
              }}
              size="small"
              variant="contained"
              startIcon={<ImageRoundedIcon />}
              className="option text-capitalize"
            >
              Photo
            </Button>
            <Button
              variant="contained"
              sx={{ textTransform: "capitalize", backgroundColor: blue[600] }}
              onClick={uploadPost}
              size="small"
              className="btn btn-sm text-white"
            >
              Share
            </Button>
          </div>
        </div>
        <div style={{ display: "none" }}>
          <input
            name="myImg"
            accept="image/x-png,image/gif,image/jpeg"
            onChange={(e) => onImgChange(e)}
            ref={imgRef}
            type="file"
          />
        </div>
        {img && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CloseRoundedIcon
              sx={{
                cursor: "pointer",
                alignSelf: "self-end",
                marginBottom: "0.2rem",
              }}
              onClick={() => setImg(null)}
            />
            <div className="previewImg">
              <img src={img.image} alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
