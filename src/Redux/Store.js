import { createStore } from "redux";
import RootReducer from "./RootReducer";

export default function configureStore() {
  const store = createStore(RootReducer);
  return store;
}
