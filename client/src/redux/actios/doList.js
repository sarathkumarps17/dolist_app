import { DOLIST_LOADED, FAILED_LOAIDNG, CLEAR_DOLIST } from "../types";

import axios from "axios";
import { setAlert } from "./alert";
import { fetchCollection } from "./collection";

///// LOAD ITEMS ////////////////////////////////////////////////////////////////

export const loadDolist = () => async (dispatch) => {
  try {
    const res = await axios.get("/dolist");
    const doList = res.data.doList;
    dispatch({
      type: DOLIST_LOADED,
      payload: doList,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FAILED_LOAIDNG,
    });
    dispatch(setAlert("Loading Failed Try Later", "danger"));
  }
};

/////////////// CLEAR ITEMS ///////////////////

export const clearDolist = () => (dispatch) => {
  dispatch({
    type: CLEAR_DOLIST,
  });
};

///// ADD ITEM ////////////////////////////////////////////////////////////////

export const addDolistItem = ({ heading, content, priority, isDone }) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let body = JSON.stringify({ heading, content, priority, isDone });

    const res = await axios.post("/dolist", body, config);
    if (res.status === 200) {
      dispatch(setAlert("Item Added", "success"));
    }
    dispatch(fetchCollection());
    dispatch(loadDolist());
  } catch (err) {
    console.log(err);
    console.log(err.response.data.errors);
    let errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

///// UPDATE ITEM ////////////////////////////////////////////////////////////////

export const updateItem = ({
  item_id,
  heading,
  content,
  priority,
  isDone,
}) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let body = JSON.stringify({
      item_id,
      heading,
      content,
      priority,
      isDone,
    });
    const res = await axios.put("/dolist", body, config);
    if (res.status === 200) {
      dispatch(setAlert("Item Updated", "success"));
    }
    dispatch(fetchCollection());
    dispatch(loadDolist());
  } catch (err) {
    console.log(err);
    console.log(err.response.data.errors);
    let errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

///// REMOVE ITEM ////////////////////////////////////////////////////////////////
export const removeItem = (id) => async (dispatch) => {
  try {
    let res;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    res = await axios.delete(`/doList/${id}`, config);
    if (res.status === 200) {
      dispatch(setAlert("Item Deleted", "warning"));
    }
    dispatch(fetchCollection());
    dispatch(loadDolist());
  } catch (err) {
    console.log(err.message);
    console.log(err.response.data.errors);
    let errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
