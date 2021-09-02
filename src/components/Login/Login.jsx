import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCurrentUserAction } from "../../redux/user/user-actions";
import { loginService } from "../../services/authService";
import CustomButton from "../CustomButton/CustomButton";

import "./Login.scss";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await loginService(email, password);
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
    <form onSubmit={handleSubmit} className="Login">
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
      {error && <p className="error-text">{error}</p>}

      <CustomButton level="primary" type="submit">
        {loading ? "Chargement..." : "Connexion"}
      </CustomButton>

      {/* {loading && <p className="loading-text">Chargement...</p>} */}
    </form>
  );
};

export default Login;
