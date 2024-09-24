import React from "react";
import Skeleton from "./Skeleton";

function SkelentonBook({ title, sub_title }) {
  return (
    <>
      <div className="for-you__title">{title}</div>
      {sub_title === "" ? (
        <Skeleton height={20} width={"10%"} borderRadius={0} />
      ) : (
        <div className="for-you__sub--title">{sub_title}</div>
      )}

      <div className="for-you__recommended--books">
        {new Array(7).fill(0).map((_, index) => (
          <a key={index} className="for-you__recommended--books-link">
            <figure className="book__image--wrapper mb-9">
              <div className="book__image block">
                <Skeleton height={200} width={"100%"}  borderRadius={0}  />
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
        ))}
      </div>
    </>
  );
}

export default SkelentonBook;
