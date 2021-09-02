import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IoShareSocial,
  IoClipboard,
  IoArrowDownCircleOutline,
} from "react-icons/io5";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

import "./ShareButton.scss";
import CustomButton from "../CustomButton/CustomButton";
import PopupWrapper from "../PopupWrapper/PopupWrapper";

const ShareButton = ({ dataID }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const copyAlertEl = useRef();
  const timer = useRef(null);

  const handleShare = async (dataID) => {
    setPopupOpen(true);
  };

  const url = window.location.href;

  const handleCopyUrl = () => {
    clearTimeout(timer.current);
    copyAlertEl.current.innerHTML = "&nbsp;";
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state === "granted" || result.state === "prompt") {
        navigator.clipboard.writeText(url).then(
          function () {
            copyAlertEl.current.textContent = "Copié !";
          },
          function () {
            copyAlertEl.current.textContent = "Erreur lors de la copie...";
          }
        );
      }
      timer.current = setTimeout(() => {
        copyAlertEl.current.innerHTML = "&nbsp;";
      }, 1000);
    });
  };

  return (
    <>
      <PopupWrapper
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        className="ShareButton__wrapper"
      >
        <h3>Partager cette publication</h3>
        <p>Choisissez une des options ci-dessous :</p>
        <div className="ShareButton__buttons">
          <FacebookShareButton url={url}>
            <FacebookIcon round={true} size={48} />
          </FacebookShareButton>
          <TwitterShareButton url={url}>
            <TwitterIcon round={true} size={48} />
          </TwitterShareButton>
          <LinkedinShareButton url={url}>
            <LinkedinIcon round={true} size={48} />
          </LinkedinShareButton>
          <RedditShareButton url={url}>
            <RedditIcon round={true} size={48} />
          </RedditShareButton>
          <TelegramShareButton url={url}>
            <TelegramIcon round={true} size={48} />
          </TelegramShareButton>
          <EmailShareButton
            url={url}
            body="Bonjour ! Voici une référence que je souhaite vous partager : "
            className="ShareButton__icon"
          >
            <EmailIcon round={true} size={48} />
          </EmailShareButton>
        </div>
        <div className="ShareButton__copy">
          <label htmlFor="url">Ou copiez le lien directement :</label>
          <div className="ShareButton__copy--input">
            <input
              type="text"
              name="url"
              id="url"
              value={url}
              className="text-ellipsis"
            />
            <CustomButton onClick={handleCopyUrl} level="secondary">
              <IoClipboard className="logo-md" />
            </CustomButton>
          </div>
          <p ref={copyAlertEl}>&nbsp;</p>
        </div>
      </PopupWrapper>
      <CustomButton
        className="ShareButton"
        level="secondary"
        onClick={handleShare}
      >
        <IoShareSocial className="sm-button-logo" />
        Partager
      </CustomButton>
    </>
  );
};

export default ShareButton;
