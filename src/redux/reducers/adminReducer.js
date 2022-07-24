const initialState = false;

const adminReducer = (state = initialState, action) => {
  if (action.type === "ADMIN_LOGIN") return true;
  else if (action.type === "ADMIN_LOGOUT") return false;
  else return state;
};

export default adminReducer;
