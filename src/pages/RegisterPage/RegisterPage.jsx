import React from "react";
import { Link, useLocation } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton";
import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";

import "./RegisterPage.scss";

const RegisterPage = () => {
  const location = useLocation().pathname;

  return (
    <div class="RegisterPage">
      <div className="RegisterPage__wrapper">
        <h1>Bienvenue sur AnimalRef !</h1>
        <p>
          Connectez-vous pour publier, voter et enregistrer vos favoris.
          <br />
          {location === "/login" ? (
            <>
              <p>Merci de vous connecter pour accéder au contenu.</p>
              <Login />
              <p>Vous n'avez pas encore de compte ? Créez-en un :</p>
              <Link to="/signup">
                <CustomButton level="transparent">S'inscrire</CustomButton>
              </Link>
            </>
          ) : (
            <>
              <p>Merci de vous inscrire pour accéder au contenu.</p>
              <Signup />
              <p>Vous avez déjà un compte ? Connectez-vous :</p>
              <Link to="/login">
                <CustomButton level="transparent">Se connecter</CustomButton>
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
