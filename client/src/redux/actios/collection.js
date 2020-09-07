import {
  COLLECTION_FETCHED,
  CLEAR_COLLECTION,
  FAILED_FETCHING,
} from "../types";
import { setAlert } from "./alert";
import axios from "axios";
import { loadDolist } from "./doList";

///////////// FETCH COLLECTION /////////////////////////////////////////////
export const fetchCollection = () => async (dispatch) => {
  try {
    const res = await axios.get("/home");
    const collection = res.data;
    dispatch({
      type: COLLECTION_FETCHED,
      payload: collection,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FAILED_FETCHING,
    });
    dispatch(setAlert("Failed Loading try later", "danger"));
  }
};

/////////////// CLEAR COLLECTION /////////////////////////////////////////////////////

export const clearCollection = () => (dispatch) => {
  dispatch({
    type: CLEAR_COLLECTION,
  });
};

////////////// Status Toggle /////////////////////

export const toggleStatus = ({ item_id, isDone = true }) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let body = JSON.stringify({ item_id, isDone });
    const res = await axios.put("/admin", body, config);
    if (res.status === 200) {
      dispatch(fetchCollection());
      dispatch(loadDolist());
    } else {
      dispatch({
        type: FAILED_FETCHING,
      });
      dispatch(setAlert("Failed Loading try later", "danger"));
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: FAILED_FETCHING,
    });
    dispatch(setAlert("Failed Loading try later", "danger"));
  }
};
