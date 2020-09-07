import { DOLIST_LOADED, FAILED_LOAIDNG, CLEAR_DOLIST } from "../types";

const initialState = {
  loading: true,
  items: [],
  error: false,
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case DOLIST_LOADED:
      return {
        ...state,
        loading: false,
        items: payload,
        error: false,
      };
    case FAILED_LOAIDNG:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case CLEAR_DOLIST:
      return initialState;
    default:
      return state;
  }
}
