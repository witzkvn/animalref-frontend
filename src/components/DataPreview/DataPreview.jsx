import React from "react";
import { Link } from "react-router-dom";
import "./DataPreview.scss";

const DataPreview = ({ data }) => {
  const { title, description, refLink, rating, dataId } = data;
  return (
    <Link to={`/data/${dataId}`} className="DataPreview">
      <div className="DataPreview__wrapper">
        <div className="DataPreview__top">
          <div className="DataPreview__text">
            <h3 className="DataPreview__title text-ellipsis">{title}</h3>
            <div className="DataPreview__description text-ellipsis">
              {description}
            </div>
          </div>
          <div className="DataPreview__rating">
            <p>Note</p>
            <p className="DataPreview__rating--value">{rating}</p>
          </div>
        </div>
        <div className="DataPreview__bottom">
          <p className="text-ellipsis">Réf. : {refLink}</p>
        </div>
      </div>
    </Link>
  );
};

export default DataPreview;
