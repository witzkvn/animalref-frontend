import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import {
  setClickedUserAction,
  setCurrentUserAction,
} from "../../redux/user/user-actions";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

import "./Navigation.scss";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { selectSearchParams } from "../../redux/search/search-selectors";
import { setSearchParams } from "../../redux/search/search-actions";
import { getAllDatasAction } from "../../redux/data/data-actions";
import { getSearchApiUrl } from "../../helper/functions/getSearchApiUrl";

const Navigation = ({ setNavOpen }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const searchParams = useSelector(selectSearchParams);
  const searchParamsCategory = searchParams?.searchCategory;
  const appRightEl = document.getElementsByClassName("App__right")[0];

  const handleLogout = () => {
    dispatch(setCurrentUserAction(false));
  };

  const handleNavClose = () => {
    setNavOpen(false);
  };

  const handleSearchCategory = (category) => {
    const searchParamsObj = {
      ...searchParams,
      searchCategory: category ? [category] : [],
      searchPage: 1,
      searchOrder: "-createdAt",
    };
    appRightEl && appRightEl.scrollTo(0, 0);
    dispatch(setSearchParams(searchParamsObj));
    dispatch(getAllDatasAction(getSearchApiUrl(searchParamsObj)));

    handleNavClose();
  };

  // console.log(searchParamsCategory, searchParamsCategory.includes("chasse"));

  return (
    <div className="Navigation" onClick={(e) => e.stopPropagation()}>
      <div className="Navigation__header">
        <div className="Navigation__header--menu" onClick={handleNavClose}>
          <IoClose className="logo-md" />
        </div>
        <h1>Menu</h1>
      </div>

      <div className="Navigation__links">
        <Link
          className={`Navigation__links--link ${
            searchParamsCategory && searchParamsCategory?.length === 0
              ? "active"
              : ""
          }`}
          exact
          to="/"
          onClick={() => handleSearchCategory(null)}
        >
          Tous
        </Link>
        <Link
          className={`Navigation__links--link ${
            searchParamsCategory && searchParamsCategory?.includes("chasse")
              ? "active"
              : ""
          }`}
          exact
          to="/"
          onClick={() => handleSearchCategory("chasse")}
        >
          Chasse
        </Link>
        <Link
          className={`Navigation__links--link ${
            searchParamsCategory && searchParamsCategory?.includes("peche")
              ? "active"
              : ""
          }`}
          exact
          to="/"
          onClick={() => handleSearchCategory("peche")}
        >
          Pêche
        </Link>

        <Link
          className={`Navigation__links--link ${
            searchParamsCategory &&
            searchParamsCategory?.includes("environnement")
              ? "active"
              : ""
          }`}
          to="/"
          onClick={() => handleSearchCategory("environnement")}
        >
          Environnement
        </Link>
        <Link
          className={`Navigation__links--link ${
            searchParamsCategory && searchParamsCategory?.includes("nutrition")
              ? "active"
              : ""
          }`}
          to="/"
          onClick={() => handleSearchCategory("nutrition")}
        >
          Nutrition
        </Link>
        <Link
          className={`Navigation__links--link ${
            searchParamsCategory &&
            searchParamsCategory?.includes("laboratoire")
              ? "active"
              : ""
          }`}
          to="/"
          onClick={() => {
            handleSearchCategory("laboratoire");
          }}
        >
          Laboratoire
        </Link>
        <Link
          className={`Navigation__links--link ${
            searchParamsCategory &&
            searchParamsCategory?.includes("traditions-loisirs")
              ? "active"
              : ""
          }`}
          to="/"
          onClick={() => {
            handleSearchCategory("traditions-loisirs");
          }}
        >
          Traditions & Loisirs
        </Link>
        <Link
          className={`Navigation__links--link ${
            searchParamsCategory && searchParamsCategory?.includes("biologie")
              ? "active"
              : ""
          }`}
          to="/"
          onClick={() => {
            handleSearchCategory("biologie");
          }}
        >
          Biologie
        </Link>
        <Link
          className={`Navigation__links--link ${
            searchParamsCategory && searchParamsCategory?.includes("produits")
              ? "active"
              : ""
          }`}
          to="/"
          onClick={() => {
            handleSearchCategory("produits");
          }}
        >
          Produits
        </Link>
        <Link
          className={`Navigation__links--link ${
            searchParamsCategory && searchParamsCategory?.includes("autre")
              ? "active"
              : ""
          }`}
          to="/"
          onClick={() => {
            handleSearchCategory("autre");
          }}
        >
          Autre
        </Link>
      </div>
      {currentUser ? (
        <Link
          to="/"
          className="Navigation__deconnexion"
          onClick={() => {
            handleNavClose();
            handleLogout();
          }}
        >
          Déconnexion
        </Link>
      ) : (
        <>
          <Link to="/login" className="Navigation__deconnexion">
            <div
              onClick={() => {
                handleNavClose();
              }}
            >
              Connexion
            </div>
          </Link>
          <Link to="/signup" className="Navigation__deconnexion">
            <div
              onClick={() => {
                handleNavClose();
              }}
            >
              Inscription
            </div>
          </Link>
        </>
      )}
      <ThemeToggle />
    </div>
  );
};

export default Navigation;
