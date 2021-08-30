import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserfavorites } from "../../redux/user/user-selectors";
import { IoAlertCircle } from "react-icons/io5";

import "./SignalButton.scss";
import { toggleFavDataAction } from "../../redux/data/data-actions";
import CustomButton from "../CustomButton/CustomButton";

const SignalButton = ({ dataID }) => {
  const dispatch = useDispatch();
  // const userFavs = useSelector(selectUserfavorites);
  // const recipeIsFav = userFavs ? userFavs.some((id) => id === dataID) : false;
  // const [isFav, setIsFav] = useState(recipeIsFav);

  const handleShare = async (dataID) => {};

  return (
    <CustomButton
      className="SignalButton"
      level="secondary"
      onClick={handleShare}
    >
      <IoAlertCircle className="sm-button-logo" />
      Signaler
    </CustomButton>
  );
};

export default SignalButton;
