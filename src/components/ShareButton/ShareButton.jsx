import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserfavorites } from "../../redux/user/user-selectors";
import { IoShareSocial } from "react-icons/io5";

import "./ShareButton.scss";
import { toggleFavDataAction } from "../../redux/data/data-actions";
import CustomButton from "../CustomButton/CustomButton";

const ShareButton = ({ dataID }) => {
  const dispatch = useDispatch();
  // const userFavs = useSelector(selectUserfavorites);
  // const recipeIsFav = userFavs ? userFavs.some((id) => id === dataID) : false;
  // const [isFav, setIsFav] = useState(recipeIsFav);

  const handleShare = async (dataID) => {};

  return (
    <CustomButton
      className="ShareButton"
      level="secondary"
      onClick={handleShare}
    >
      <IoShareSocial className="sm-button-logo" />
      Partager
    </CustomButton>
  );
};

export default ShareButton;
