import { AIContext } from "../Helpers/Context";
import iconMapping from "../utils/iconMapping";
import React, { useContext } from "react";
import SkelentonBook from "./ui/skelenton/SkelentonBook";

function Book({ book, loading }) {
  // console.log(book);
  const {
    imageLink,
    audioLink,
    author,
    title,
    subTitle,
    id,
    status,
    subscriptionRequired,
    totalRating,
  } = book;
  const { isCheckingUser, setIsCheckingUser } = useContext(AIContext);
  const FaPlayCircle = iconMapping["FaPlayCircle"];
  const IoTimeOutline = iconMapping["IoTimeOutline"];
  const CiStar = iconMapping["CiStar"];
  return (
    <a className="for-you__recommended--books-link" href="/book/5bxl50cz4bt">
      <audio src={audioLink}></audio>
      <figure className="book__image--wrapper mb-2">
        <img className="book__image block" src={imageLink} alt="book" />
      </figure>
      <div className="recommended__book--title">{title}</div>
      <div className="recommended__book--author">{author}</div>
      <div className="recommended__book--sub-title">{subTitle}</div>
      <div className="recommended__book--details-wrapper">
        <div className="recommended__book--details">
          <div className="recommended__book--details-icon">
            <IoTimeOutline />
          </div>
          <div className="recommended__book--details-text">03:24</div>
        </div>
        <div className="recommended__book--details">
          <div className="recommended__book--details-icon">
            <CiStar />
          </div>
          <div className="recommended__book--details-text">4.4</div>
        </div>
      </div>
    </a>
  );
}

export default Book;
