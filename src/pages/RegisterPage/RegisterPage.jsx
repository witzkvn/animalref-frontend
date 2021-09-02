import React from "react";
import { Link, useLocation } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton";
import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";

import "./RegisterPage.scss";

const RegisterPage = () => {
  const location = useLocation().pathname;

  return (
    <div class="RegisterPage pageWrapWidth container-medium">
      <div className="RegisterPage__wrapper">
        <h1>Bienvenue sur Datanimal !</h1>
        <p>Connectez-vous pour publier, voter et enregistrer vos favoris.</p>
        {location === "/login" ? (
          <>
            <div className="RegisterPage__switch">
              <p>Vous n'avez pas encore de compte ?</p>
              <Link to="/signup">
                <CustomButton level="secondary">S'inscrire</CustomButton>
              </Link>
            </div>
            <Login />
          </>
        ) : (
          <>
            <div className="RegisterPage__switch">
              <p>Vous avez déjà un compte ?</p>
              <Link to="/login">
                <CustomButton level="secondary">Se connecter</CustomButton>
              </Link>
            </div>
            <Signup />
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
