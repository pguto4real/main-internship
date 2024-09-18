import { AIContext } from "../Helpers/Context";
import iconMapping from "../utils/iconMapping";
import React, { useContext } from "react";
import SkelentonBook from "./ui/skelenton/SkelentonBook";

function Book({ img, audio }) {
  const { isCheckingUser, setIsCheckingUser } = useContext(AIContext);
  const FaPlayCircle = iconMapping["FaPlayCircle"];
  const IoTimeOutline = iconMapping["IoTimeOutline"];
  const CiStar = iconMapping["CiStar"];
  return isCheckingUser ? (
    <SkelentonBook />
  ) : (
    <a className="for-you__recommended--books-link" href="/book/5bxl50cz4bt">
     
      <audio src={audio}></audio>
      <figure className="book__image--wrapper mb-2">
        <img className="book__image block" src={img} alt="book" />
      </figure>
      <div className="recommended__book--title">
        How to Win Friends and Influence People in the Digital Age
      </div>
      <div className="recommended__book--author">Dale Carnegie</div>
      <div className="recommended__book--sub-title">
        Time-tested advice for the digital age
      </div>
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
