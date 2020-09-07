import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Item from "../../elements/Item";
import { fetchCollection } from "../../redux/actios/collection";

function Home({ collection, fetchCollection }) {
  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);
  return (
    <div className="container">
      <div className="home-container">
        <div className="collection-container">
          {collection.map((item) => (
            <Item className="collection-item" {...item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  collection: PropTypes.array.isRequired,
  fetchCollection: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  collection: state.collection.collection,
});
export default connect(mapStateToProps, { fetchCollection })(Home);
