import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserfavorites } from "../../redux/user/user-selectors";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

import "./AddFavButton.scss";
import { toggleFavDataAction } from "../../redux/data/data-actions";
import CustomButton from "../CustomButton/CustomButton";

const AddFavButton = ({ dataID }) => {
  const dispatch = useDispatch();
  const userFavs = useSelector(selectUserfavorites);
  const recipeIsFav = userFavs ? userFavs.some((id) => id === dataID) : false;
  const [isFav, setIsFav] = useState(recipeIsFav);

  const toggleFavHandler = async (dataID) => {
    setIsFav((prevState) => !prevState);
    try {
      await dispatch(toggleFavDataAction(dataID));
    } catch (error) {
      setIsFav((prevState) => !prevState);
    }
  };

  return (
    <CustomButton
      className="AddFavButton"
      level="secondary"
      onClick={() => toggleFavHandler(dataID)}
    >
      {isFav ? (
        <>
          <IoHeart className="sm-button-logo" />
          Supprimer des favoris
        </>
      ) : (
        <>
          <IoHeartOutline className="sm-button-logo" />
          Ajouter aux favoris
        </>
      )}
    </CustomButton>
  );
};

export default AddFavButton;
