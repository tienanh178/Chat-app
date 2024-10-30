import React from "react";
import RingLoader from "react-spinners/RingLoader";

const styles = {
  overlay: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
};

const Loader = ({ loading, size }) => {
  return (
    <div style={styles.overlay}>
      <RingLoader size={100} />
    </div>
  );
};

export default Loader;
