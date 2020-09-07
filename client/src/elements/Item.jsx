import React from "react";
import urgent from "../resorces/images/category/urgent.png";
import high from "../resorces/images/category/high.png";
import medium from "../resorces/images/category/medium2.png";
import low from "../resorces/images/category/low.png";
import Button from "./Button";
import { connect } from "react-redux";
import { toggleStatus } from "../redux/actios/collection";
import PropTypes from "prop-types";

function Item({
  toggleStatus,
  _id,
  heading,
  content,
  priority,
  isDone,
  className,
}) {
  var priority_img;
  switch (priority) {
    case "Urgent":
      priority_img = urgent;
      break;
    case "High":
      priority_img = high;
      break;
    case "Medium":
      priority_img = medium;
      break;
    case "Low":
      priority_img = low;
      break;
    default:
      priority_img = "";
  }

  const done = (event) => {
    event.preventDefault();
    toggleStatus({ item_id: _id, isDone: true });
  };
  return (
    <div className={className}>
      <h2 className={`${className}-heading`}>{heading}</h2>
      <p className={`${className}-content`}>{content}</p>
      <div className={`${className}-properties`}>
        <p className={`${className}-properties-priority`}>
          <span className="text">Priority :</span>
          <span>{priority}</span>{" "}
          <img src={priority_img} alt={"priority-img"} />
        </p>
        {isDone ? (
          <p className={`${className}-properties-done`}>
            {" "}
            <span className="text">Status :</span> <span>DONE</span>
          </p>
        ) : (
          <p className={`${className}-properties-notDone`}>
            <span className="text">Status :</span> <span>NOT DONE</span>{" "}
            {_id && (
              <Button
                className={`${className}-btn ${className}-btn-done`}
                children="Done"
                onClick={done}
              />
            )}
          </p>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  toggleStatus: PropTypes.func.isRequired,
};

export default connect(null, { toggleStatus })(Item);
