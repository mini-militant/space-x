import {
  SEARCHED_ITEM,
  IS_SIGNED_IN,
  IS_SIGNED_OUT,
  USER_ROLE,
} from "./Actions";

const initState = {
  searchedItem: "",
  isSignedIn: false,
  userRole: "",
};

export default function RootReducer(state = initState, action) {
  console.log("rootreducer", state, action);

  switch (action.type) {
    case SEARCHED_ITEM:
      return {
        ...state,
        searchedItem: action.searchItem,
      };

    case IS_SIGNED_IN:
      return {
        ...state,
        isSignedIn: true,
      };

    case IS_SIGNED_OUT:
      return {
        ...state,
        isSignedIn: false,
      };
    case USER_ROLE:
      return {
        ...state,
        userRole: action.role,
      };
    default:
      return state;
  }
}
