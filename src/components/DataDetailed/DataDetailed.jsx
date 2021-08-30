import React, { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import "./DataDetailed.scss";
import { IoCaretUp, IoCaretDown } from "react-icons/io5";
import AddFavButton from "../AddFavButton/AddFavButton";
import ShareButton from "../ShareButton/ShareButton";
import SignalButton from "../SignalButton/SignalButton";
import ImageFullscreenSlider from "../ImageFullscreenSlider/ImageFullscreenSlider";
import VoteBlock from "../VoteBlock/VoteBlock";

const DataDetailed = ({ data }) => {
  const {
    _id,
    title,
    description,
    images,
    rating,
    refTime,
    refLink,
    category,
    user,
    createdAt,
  } = data;
  const [checked, setChecked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFullscreen, setImageFullscreen] = useState(false);

  const handleCheck = (e) => {
    setChecked((prevState) => !prevState);
  };

  const handleOpenImageSlider = (imgUrl) => {
    setSelectedImage(imgUrl);
    setImageFullscreen(true);
  };

  const handleCloseImageSlider = () => {
    setImageFullscreen(false);
    setSelectedImage(null);
  };

  return (
    <>
      {imageFullscreen && (
        <ImageFullscreenSlider
          imgUrl={selectedImage}
          handleCloseImageSlider={handleCloseImageSlider}
        />
      )}
      <div className="DataDetailed pageWrapWidth container-medium">
        <div className="DataDetailed__text">
          <h2>{title && title}</h2>
          <div>{description && description}</div>
        </div>

        <div className="DataDetailed__images">
          <h4>Images associées</h4>
          <div className="DataDetailed__images--block">
            {images?.length > 0 ? (
              images.map((img, index) => (
                <img
                  key={`${_id}-image-${index}`}
                  src={img}
                  alt={`illustration publication ${index}`}
                  onClick={() => handleOpenImageSlider(img)}
                />
              ))
            ) : (
              <p>Aucune image associée pour le moment.</p>
            )}
            <img
              src="https://support.content.office.net/fr-fr/media/c957b99e-083e-4443-afc6-c372ea43ed08.png"
              alt=""
              onClick={() =>
                handleOpenImageSlider(
                  "https://support.content.office.net/fr-fr/media/c957b99e-083e-4443-afc6-c372ea43ed08.png"
                )
              }
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/US_and_USSR_nuclear_stockpiles.svg/langfr-200px-US_and_USSR_nuclear_stockpiles.svg.png"
              alt=""
              onClick={() =>
                handleOpenImageSlider(
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/US_and_USSR_nuclear_stockpiles.svg/langfr-200px-US_and_USSR_nuclear_stockpiles.svg.png"
                )
              }
            />
            <img
              src="https://i.pinimg.com/236x/54/84/e2/5484e289c5af5c3414a30cb14a768ea8--winding-road-the-road.jpg"
              alt=""
              onClick={() =>
                handleOpenImageSlider(
                  "https://i.pinimg.com/236x/54/84/e2/5484e289c5af5c3414a30cb14a768ea8--winding-road-the-road.jpg"
                )
              }
            />
          </div>
        </div>
        <div className="DataDetailed__ref">
          <div className="DataDetailed__refLink">
            <p>Référence :</p>
            {refLink ? (
              refLink.startsWith("http") ? (
                <a href={refLink} target="_blank" rel="noreferrer">
                  {refLink}
                </a>
              ) : (
                refLink
              )
            ) : (
              ""
            )}
          </div>
          {/* <div className="DataDetailed__refTime"></div> */}
        </div>
        <div className="DataDetailed__actions">
          <div className="DataDetailed__actions--input">
            <input
              type="checkbox"
              name="vote"
              id="vote"
              checked={checked}
              onChange={handleCheck}
            />
            <label htmlFor="vote">
              Afin de voter pour la vérification de cette publication, j'atteste
              avoir lu les informations de cette publication et les avoir
              vérifier avec la source indiquée en référence.
            </label>
          </div>
          <div className="DataDetailed__blocks">
            <div className="DataDetailed__blocks--item vote-block">
              {/* <CustomButton level="primary" disabled={!checked}>
                <IoCaretUp />
              </CustomButton>
              <div className="DataDetailed__rating">{rating ? rating : 0}</div>
              <CustomButton level="primary" disabled={!checked}>
                <IoCaretDown />
              </CustomButton> */}
              <VoteBlock rating={rating} checked={checked} />
            </div>
            <div className="DataDetailed__blocks--item">
              <AddFavButton dataID={_id ? _id : null} />
            </div>
            <div className="DataDetailed__blocks--item">
              <ShareButton />
            </div>
            <div className="DataDetailed__blocks--item">
              <SignalButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataDetailed;
