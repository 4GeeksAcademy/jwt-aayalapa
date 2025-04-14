export const initialStore = () => {
  return {
    token: null,
    user: null,
  };
};

export default function storeReducer(store, action = {}) {
  if ((action.type = "update-token")) {
    return {
      ...store,
      token: action.payload,
    };
  }
  if ((action.type = "update-user")) {
    return {
      ...store,
      user: action.payload,
    };
  }
}
