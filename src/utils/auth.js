export const getToken = () =>
  sessionStorage.getItem('snutt_token') || localStorage.getItem('snutt_token');

export const saveToken = (token, atLocal = true) => {
  if (atLocal) {
    localStorage.setItem('snutt_token', token);
  } else {
    sessionStorage.setItem('snutt_token', token);
  }
};
