export const SEARCHED_ITEM = "SEARCHED_ITEM";
export const IS_SIGNED_IN = "IS_SIGNED_IN";
export const IS_SIGNED_OUT = "IS_SIGNED_OUT";
export const USER_ROLE = "USER_ROLE";

export const setSearchedItem = (searchItem) => {
  return {
    type: SEARCHED_ITEM,
    searchItem,
  };
};

export function isSignedOut() {
  return {
    type: IS_SIGNED_OUT,
  };
}

export function isSignedIn() {
  return {
    type: IS_SIGNED_IN,
  };
}

export function setUserRole(role) {
  return {
    type: USER_ROLE,
    role,
  };
}
