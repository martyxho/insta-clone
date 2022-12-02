import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../firebase";

function Profile () {
  const {userID} = useParams();
  const [user, setUser] = useState('');

  useEffect(() => {
    async function getUser() {
      const user = await getUserProfile(userID);
      setUser(user);
      console.log(user);
    }
    getUser();
  }, [userID]);

  return (
    <div className="profile-main">
      <div className="profile-background">

      </div>
      <div className="profile-userinfo">
        <div>
          {user.name}
        </div>
        <div>
        </div>
      </div>
      <div className="profile-btns">

      </div>
    </div>
  )
}

export default Profile;