import React from "react";
import Skeleton from "./Skeleton";

function SkelentonBook() {
  return (
    <a className="for-you__recommended--books-link">
      <figure className="book__image--wrapper mb-9">
        <div className="book__image block">
          <Skeleton height={200} width={"100%"} />
        </div>
      </figure>
      <div className="recommended__book--title">
        <Skeleton height={20} width={"100%"} borderRadius={0} />
      </div>
      <div className="recommended__book--author">
        <Skeleton height={20} width={"90%"} borderRadius={0} />
      </div>

      <div className="recommended__book--sub-title">
        <Skeleton height={35} width={"80%"} borderRadius={0} />
      </div>

      <div className="recommended__book--details-wrapper">
        <Skeleton height={20} width={"100%"} borderRadius={0} />
      </div>
    </a>
  );
}

export default SkelentonBook;
