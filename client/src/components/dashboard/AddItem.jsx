import React, { useState } from "react";
import PropTypes from "prop-types";
import EditItem from "../../layouts/EditItem";
import { addDolistItem } from "../../redux/actios/doList";
import { connect } from "react-redux";

function AddItem({ addDolistItem, className }) {
  const priority_options = [
    { id: 1, value: "Medium", label: "Medium" },
    { id: 2, value: "Low", label: "Low" },
    { id: 3, value: "High", label: "High" },
    { id: 4, value: "Urgent", label: "Urgent" },
  ];
  const initialState = {
    heading: "",
    content: "",
    priority: "Medium",
    isDone: false,
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    addDolistItem({ ...formData });
    setFormData(initialState);
  };

  return (
    <EditItem
      className={className}
      handleChange={handleChange}
      formData={formData}
      priority_options={priority_options}
      handleSubmit={handleSubmit}
      children="Add  "
    />
  );
}

AddItem.propTypes = {
  addDolistItem: PropTypes.func.isRequired,
};

export default connect(null, { addDolistItem })(AddItem);
