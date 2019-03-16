export const getToken = () =>
  sessionStorage.getItem('snutt_token') || localStorage.getItem('snutt_token');

export const clearToken = () => {
  sessionStorage.removeItem('snutt_id');
  sessionStorage.removeItem('snutt_token');
  localStorage.removeItem('snutt_id');
  localStorage.removeItem('snutt_token');
};

export const saveToken = (token, atLocal = true) => {
  clearToken();
  if (atLocal) {
    localStorage.setItem('snutt_token', token);
  } else {
    sessionStorage.setItem('snutt_token', token);
  }
};

export const changeToken = newToken => {
  const storage = sessionStorage.getItem('snutt_token')
    ? sessionStorage
    : localStorage;
  clearToken();
  console.log(
    'OLD',
    sessionStorage.getItem('snutt_token'),
    localStorage.getItem('snutt_token'),
  );
  storage.setItem('snutt_token', newToken);
  console.log(
    'NEW',
    sessionStorage.getItem('snutt_token'),
    localStorage.getItem('snutt_token'),
  );
};
