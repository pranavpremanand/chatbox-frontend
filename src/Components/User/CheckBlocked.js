import { useEffect } from "react";
import userAPI from "../../APIs/UserAPI";

const CheckBlocked = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const response = await userAPI.get("/user/check-status/" + user._id);
      console.log(response, "response");
      if (response.data.blocked) {
        return console.log("USER BLOCKED");
      } else {
        console.log('User not blocked')
        return props.children;
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export default CheckBlocked;
