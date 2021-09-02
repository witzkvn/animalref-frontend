import React from "react";
import { Link } from "react-router-dom";
import { convertNumber } from "../../helper/functions/convertNumber";
import "./DataPreview.scss";

const DataPreview = ({ data }) => {
  const { title, description, refLink, rating, _id } = data;
  console.log(data);
  return (
    <Link to={`/data/${_id}`} className="DataPreview">
      <div className="DataPreview__wrapper">
        <div className="DataPreview__top">
          <div className="DataPreview__text">
            <h3 className="DataPreview__title text-ellipsis">{title}</h3>
            <div className="DataPreview__description text-ellipsis">
              {description}
            </div>
          </div>
          <div className="DataPreview__rating">
            <p className="DataPreview__rating--value">
              {convertNumber(rating)}
            </p>
          </div>
        </div>
        <div className="DataPreview__bottom">
          <div>
            Réf. :{" "}
            {refLink ? (
              refLink.startsWith("http") ? (
                <a
                  href={refLink}
                  className="text-ellipsis"
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {refLink}
                </a>
              ) : (
                refLink
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DataPreview;
