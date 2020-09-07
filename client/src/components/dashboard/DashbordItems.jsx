import React, { useState } from "react";
import Button from "../../elements/Button";
import UpdateItem from "./UpdateItem";
import { removeItem } from "../../redux/actios/doList";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Item from "../../elements/Item";

function DashbordItems({ removeItem, _id, ...otherProps }) {
  const [edit, setstEdit] = useState(false);
  return (
    <div className="dashboard-item-cover">
      <Item {...otherProps} />
      {edit && <UpdateItem className="updateItem" id={_id} />}
      <div className="dashboard-item-cover-btn-container">
        <div className="dashboard-item-cover-btn-container-edit">
          <Button
            className="dashboard-item-cover-btn dashboard-item-cover-btn-edit"
            children={!edit ? "Edit" : "Done"}
            onClick={() => setstEdit(!edit)}
          />
        </div>

        <div className="dashboard-item-cover-btn-container-delete">
          <Button
            className="dashboard-item-cover-btn dashboard-item-cover-btn-delete"
            children="Delete"
            onClick={() => {
              removeItem(_id);
            }}
          />
        </div>
      </div>
    </div>
  );
}
DashbordItems.propTypes = {
  removeItem: PropTypes.func.isRequired,
};

export default connect(null, { removeItem })(DashbordItems);
