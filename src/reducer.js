export const initialState = {
  user: null,
  uid: null,
  sidebar: "false",
};
export const actionTypes = {
  SET_USER: "SET_USER",
  SET_UID: "SET_UID",
  SET_SIDEBAR: "SET_SIDEBAR",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_UID:
      return {
        ...state,
        uid: action.uid,
      };
    case actionTypes.SET_SIDEBAR:
      return {
        ...state,
        sidebar: action.SIDEBAR,
      };

    default:
      return state;
  }
};

export default reducer;
