import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/default_avatar.jpg";
import { setClickedUserAction } from "../../redux/user/user-actions";

import "./UserAvatar.scss";

const UserAvatar = ({ imgSrc, toAccount }) => {
  const dispatch = useDispatch();
  const handleImgError = (e) => {
    e.target.src = defaultAvatar;
  };

  if (toAccount) {
    return (
      <Link className="UserAvatar" to="/compte">
        <div>
          <img
            src={imgSrc || defaultAvatar}
            onError={handleImgError}
            alt="User Avatar"
          />
        </div>
      </Link>
    );
  }

  return (
    <div className="UserAvatar">
      <img
        src={imgSrc || defaultAvatar}
        onError={handleImgError}
        alt="User Avatar"
      />
    </div>
  );
};

export default UserAvatar;
