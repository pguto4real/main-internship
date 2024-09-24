import React from "react";

const Skeleton = ({ width, height, borderRadius, marginBottom }) => {
  return (
    <div
      className={`skeleton ${marginBottom && "mb-2"}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    ></div>
  );
};

export default Skeleton;
