import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadDolist } from "../../redux/actios/doList";
import DashbordItems from "./DashbordItems";
import Button from "../../elements/Button";
import AddItem from "./AddItem";

function Dashboard({ doList, loadDolist }) {
  const [addItem, setaddItem] = useState(false);

  useEffect(() => {
    loadDolist();
  }, [loadDolist]);

  const add = () => {
    loadDolist();
    return setaddItem(!addItem);
  };

  return (
    <div className="container">
      <div className="dashboard-container">
        <div className="dashboard-item-container">
          {doList.map((item) => (
            <DashbordItems
              key={item._id}
              className="dashboard-item"
              {...item}
            />
          ))}
          {addItem && (
            <div className="addItem-container">
              <AddItem className="addItem-container-box" mode={"add"} />
              <Button
                className="addItem-container-box-btn addItem-container-box-btn-close"
                children="X"
                onClick={add}
              />
            </div>
          )}
        </div>
        {!addItem && (
          <div className="btn-container">
            <Button
              className="btn-container-btn btn-container-btn-dark"
              children="Add Item"
              onClick={add}
            />
          </div>
        )}
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  doList: PropTypes.array.isRequired,
  loadDolist: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  doList: state.doList.items,
});
export default connect(mapStateToProps, { loadDolist })(Dashboard);
