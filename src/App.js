import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import Navigation from "./components/Navigation/Navigation";
import Searchbar from "./components/Searchbar/Searchbar";
import { selectCurrentUser } from "./redux/user/user-selectors";
import Routes from "./routes/Routes";
import { IoMenu } from "react-icons/io5";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Login from "./components/Login/Login";
import NotificationPoper from "./components/NotificationPoper/NotificationPoper";
import { selectOverlayMessageOpen } from "./redux/layout/layout-selectors";
import UserAvatar from "./components/UserAvatar/UserAvatar";
import CustomButton from "./components/CustomButton/CustomButton";
import {
  setClickedUserAction,
  setCurrentUserAction,
} from "./redux/user/user-actions";

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const overlayOpen = useSelector(selectOverlayMessageOpen);
  const [navOpen, setNavOpen] = useState(false);
  const [userNavOpen, setUserNavOpen] = useState(true);
  const userMenuEl = useRef(null);
  const userAvatarEl = useRef(null);

  const openUserNav = (e) => {
    e.stopPropagation();
    setUserNavOpen((prevState) => !prevState);
    console.log("clic");
  };

  const handleLogout = () => {
    setUserNavOpen(false);
    dispatch(setCurrentUserAction(false));
  };

  const handleUserNavClose = useCallback(() => {
    setUserNavOpen(false);
  }, []);

  const onClose = useCallback(
    (e) => {
      if (
        userNavOpen &&
        userMenuEl.current &&
        !userMenuEl.current.contains(e.target) &&
        userAvatarEl.current &&
        !userAvatarEl.current.contains(e.target)
      ) {
        handleUserNavClose();
      }
      e.stopPropagation();
    },
    [userNavOpen, handleUserNavClose, userMenuEl]
  );

  useEffect(() => {
    document.addEventListener("mousedown", onClose);
    return () => {
      document.removeEventListener("mousedown", onClose);
    };
  }, [onClose]);

  return (
    <div className="App">
      <NotificationPoper />
      <div
        className={`App__left ${navOpen ? "active" : ""}`}
        onClick={() => setNavOpen(false)}
      >
        <Navigation setNavOpen={setNavOpen} />
      </div>
      <div className="App__right">
        {!overlayOpen && (
          <>
            <div className="App__right--fixed pc">
              <div className="App__right--top">
                <div
                  className="App__right--menu"
                  onClick={() => setNavOpen(true)}
                >
                  <IoMenu />
                </div>
                <NavLink exact to="/" className="App__right--logo">
                  <h1>Datanimal</h1>
                </NavLink>
                <Searchbar />
                {currentUser ? (
                  <div
                    className="App__right--user"
                    onClick={(e) => openUserNav(e)}
                    ref={userAvatarEl}
                  >
                    <UserAvatar imgSrc={currentUser?.avatar} />
                    {userNavOpen && (
                      <>
                        <div
                          className="App__right--userMenu"
                          onClick={(e) => e.stopPropagation()}
                          ref={userMenuEl}
                        >
                          <NavLink
                            className="App__right--userLink"
                            to="/publier"
                            onClick={handleUserNavClose}
                          >
                            Publier
                          </NavLink>
                          <NavLink
                            className="App__right--userLink"
                            to="/favoris"
                            onClick={handleUserNavClose}
                          >
                            Favoris
                          </NavLink>
                          <NavLink
                            className="App__right--userLink"
                            to="/compte"
                            onClick={() => {
                              dispatch(setClickedUserAction());
                              handleUserNavClose();
                            }}
                          >
                            Compte
                          </NavLink>
                          <NavLink
                            className="App__right--userLink"
                            to="/parametres"
                            onClick={handleUserNavClose}
                          >
                            Paramètres
                          </NavLink>
                          <Link to="/">
                            <CustomButton
                              level="secondary"
                              onClick={handleLogout}
                            >
                              Déconnexion
                            </CustomButton>
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <Link className="App__right--connexion" to="/login">
                    <CustomButton level="accent">Connexion</CustomButton>
                  </Link>
                )}
              </div>
            </div>
            <div className="App__right--fixed mobile">
              <div className="App__right--top">
                <div
                  className="App__right--menu"
                  onClick={() => setNavOpen(true)}
                >
                  <IoMenu />
                </div>
                {currentUser ? (
                  <UserAvatar imgSrc={currentUser?.avatar} toAccount={true} />
                ) : (
                  <Link>
                    <CustomButton level="accent">Connexion</CustomButton>
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
        <Routes />
      </div>
    </div>
  );
};

export default App;
