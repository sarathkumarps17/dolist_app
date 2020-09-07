import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import EditItem from "../../layouts/EditItem";
import { updateItem, loadDolist } from "../../redux/actios/doList";
import { connect } from "react-redux";

const UpdateItem = ({
  id,
  doList: { items, loading },
  updateItem,
  className,
}) => {
  const priority_options = [
    { id: 1, value: "Medium", label: "Medium" },
    { id: 2, value: "Low", label: "Low" },
    { id: 3, value: "High", label: "High" },
    { id: 4, value: "Urgent", label: "Urgent" },
  ];
  const isDone_options = [
    { id: 1, value: false, label: "NOT DONE" },
    { id: 2, value: true, label: "DONE" },
  ];
  const initialState = {
    heading: "",
    content: "",
    priority: "",
    isDone: "",
  };
  useEffect(() => {
    const item = items.filter((item) => item._id === id)[0];
    loadDolist();
    setFormData({
      heading: !item.heading ? "" : item.heading,
      content: !item.content ? "" : item.content,
      priority: !item.priority ? "" : item.priority,
      isDone: item.isDone,
      item_id: id,
    });
  }, [loading, id, items]);
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

    updateItem({ ...formData });
  };

  return (
    <EditItem
      className={className}
      handleChange={handleChange}
      formData={formData}
      priority_options={priority_options}
      isDone_options={isDone_options}
      handleSubmit={handleSubmit}
      children="Update"
    />
  );
};
UpdateItem.propTypes = {
  doList: PropTypes.object.isRequired,
  updateItem: PropTypes.func.isRequired,
  loadDolist: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  doList: state.doList,
});

export default connect(mapStateToProps, { updateItem, loadDolist })(UpdateItem);
