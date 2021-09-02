import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCurrentUserAction } from "../../redux/user/user-actions";
import { signupService } from "../../services/authService";
import CustomButton from "../CustomButton/CustomButton";

import "../Login/Login.scss";

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await signupService(
        name,
        email,
        password,
        passwordConfirm
      );
      if (response) {
        dispatch(setCurrentUserAction(response.data.data.user));
        localStorage.setItem("jwt", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        history.push("/");
      }
    } catch (err) {
      setError(err?.response?.data?.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="Signup">
      <label htmlFor="name">Nom d'utilisateur :</label>
      <input
        type="text"
        id="name"
        placeholder="John Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label htmlFor="email">Email :</label>
      <input
        type="email"
        id="email"
        placeholder="exemple@exemple.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password">Mot de passe :</label>
      <input
        type="password"
        id="password"
        placeholder="••••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label htmlFor="passwordConfirm">Confirmation du mot de passe :</label>
      <input
        type="password"
        id="passwordConfirm"
        placeholder="••••••••••"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        required
      />
      {error && <p className="error-text">{error}</p>}

      <CustomButton level="primary" type="submit">
        {loading ? "Chargement..." : "Inscription"}
      </CustomButton>

      {/* {loading && <p className="loading-text">Chargement...</p>} */}
    </form>
  );
};

export default Signup;
