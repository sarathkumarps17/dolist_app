import {
  COLLECTION_FETCHED,
  FAILED_FETCHING,
  CLEAR_COLLECTION,
} from "../types";

const initialState = {
  collection: [],
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case COLLECTION_FETCHED:
      return {
        ...state,
        loading: false,
        collection: payload,
        error: null,
      };
    case FAILED_FETCHING:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CLEAR_COLLECTION:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
