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

const Navigation = ({ setNavOpen }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(setCurrentUserAction(false));
  };

  const handleNavClose = () => {
    setNavOpen(false);
  };

  return (
    <div className="Navigation" onClick={(e) => e.stopPropagation()}>
      <div className="Navigation__header">
        <div className="Navigation__header--menu" onClick={handleNavClose}>
          <IoClose className="logo-md" />
        </div>
        <h1>Menu</h1>
      </div>

      <div className="Navigation__links">
        <NavLink
          className="Navigation__links--link"
          exact
          to="/"
          onClick={handleNavClose}
        >
          Publications
        </NavLink>
        {currentUser && (
          <>
            <NavLink
              className="Navigation__links--link"
              to="/publier"
              onClick={handleNavClose}
            >
              Publier
            </NavLink>
            <NavLink
              className="Navigation__links--link"
              to="/favoris"
              onClick={handleNavClose}
            >
              Favoris
            </NavLink>
            <NavLink
              className="Navigation__links--link"
              to="/compte"
              onClick={() => {
                dispatch(setClickedUserAction());
                handleNavClose();
              }}
            >
              Compte
            </NavLink>
            <NavLink
              className="Navigation__links--link"
              to="/parametres"
              onClick={handleNavClose}
            >
              Paramètres
            </NavLink>
          </>
        )}
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
