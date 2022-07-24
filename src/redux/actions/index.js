export const isAuth = () => {
  return {
    type: "ISLOGGEDIN",
  };
};
export const isLoggedOut = () => {
  return {
    type: "ISLOGGEDOUT",
  };
};
export const isAdminAuth = () => {
  return {
    type: "ADMIN_LOGIN",
  };
};
export const isAdminLoggedOut = () => {
  return {
    type: "ADMIN_LOGOUT",
  };
};
