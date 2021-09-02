import { client } from "..";

export const loginService = (email, password) => {
  const data = {
    email,
    password,
  };
  return client()
    .post("users/login", data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
};

export const signupService = (name, email, password, passwordConfirm) => {
  const data = {
    name,
    email,
    password,
    passwordConfirm,
  };
  return client()
    .post("users/signup", data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
};
