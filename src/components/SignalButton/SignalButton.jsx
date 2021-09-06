import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserfavorites } from "../../redux/user/user-selectors";
import { IoAlertCircle } from "react-icons/io5";

import "./SignalButton.scss";
import { toggleFavDataAction } from "../../redux/data/data-actions";
import CustomButton from "../CustomButton/CustomButton";
import PopupWrapper from "../PopupWrapper/PopupWrapper";

const SignalButton = ({ dataID }) => {
  const dispatch = useDispatch();
  const [popupOpen, setPopupOpen] = useState(false);
  // const userFavs = useSelector(selectUserfavorites);
  // const recipeIsFav = userFavs ? userFavs.some((id) => id === dataID) : false;
  // const [isFav, setIsFav] = useState(recipeIsFav);

  const handleSignal = async (dataID) => {
    setPopupOpen(true);
  };

  const onSubmit = () => {};

  return (
    <>
      <PopupWrapper
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        className="SignalButton__popup"
      >
        <h3>Signaler cette publication</h3>
        <form onSubmit={onSubmit}>
          <label htmlFor="description">
            Merci de préciser pourquoi vous souhaitez signaler cette publication
            (soyez le plus explicite possible pour un traitement correct de
            votre requête) :
          </label>
          <textarea
            name="description"
            id="description"
            required
            placeholder="Motif du signalement..."
          ></textarea>
          <CustomButton level="secondary">Envoyer signalement</CustomButton>
        </form>
      </PopupWrapper>
      <CustomButton
        className="SignalButton"
        level="secondary"
        onClick={handleSignal}
      >
        <IoAlertCircle className="sm-button-logo" />
        Signaler
      </CustomButton>
    </>
  );
};

export default SignalButton;
