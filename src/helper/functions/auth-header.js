export const authHeader = () => {
  let token = JSON.parse(localStorage.getItem('jwt'));
  if (token) {
    // axios.defaults.headers.common['Authorization'] = `Token ${user.token}`;
    return 'Bearer ' + token;
  } else {
    // delete axios.defaults.headers.common['Authorization'];
    return;
  }
}