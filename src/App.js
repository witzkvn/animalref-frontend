import { useSelector } from "react-redux";
import "./App.scss";
import Navigation from "./components/Navigation/Navigation";
import Searchbar from "./components/Searchbar/Searchbar";
import { selectCurrentUser } from "./redux/user/user-selectors";
import Routes from "./routes/Routes";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Login from "./components/Login/Login";
import NotificationPoper from "./components/NotificationPoper/NotificationPoper";
import { selectOverlayMessageOpen } from "./redux/layout/layout-selectors";
import UserAvatar from "./components/UserAvatar/UserAvatar";

const App = () => {
  const currentUser = useSelector(selectCurrentUser);
  const overlayOpen = useSelector(selectOverlayMessageOpen);
  const [navOpen, setNavOpen] = useState(false);

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
                <NavLink exact to="/">
                  <h1>AnimalRef</h1>
                </NavLink>
                <Searchbar />
                {currentUser && (
                  <UserAvatar imgSrc={currentUser?.avatar} toAccount={true} />
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
                {/* <SearchbarMobile /> */}
                {currentUser && (
                  <UserAvatar imgSrc={currentUser?.avatar} toAccount={true} />
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
