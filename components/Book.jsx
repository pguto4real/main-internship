import { AIContext } from "../Helpers/Context";
import iconMapping from "../utils/iconMapping";
import React, { useContext, useState } from "react";
import SkelentonBook from "./ui/skelenton/SkelentonBook";
import Link from "next/link";
import formatTime from "../hook/formatTime";

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
    averageRating,
    totalRating,
    
  } = book;

  const [audioDuration, setAudioDuration] = useState(null);

  const { formatTimeData } = formatTime();
  const { isCheckingUser, setIsCheckingUser,subscription } = useContext(AIContext);

  const handleAudioLoadedMetadata = (event) => {
    const duration = event.target.duration;
    setAudioDuration(duration);
  };

  const FaPlayCircle = iconMapping["FaPlayCircle"];
  const IoTimeOutline = iconMapping["IoTimeOutline"];
  const CiStar = iconMapping["CiStar"];
  return (
    <Link className="for-you__recommended--books-link" href={`/book/${id}`}>
      {subscriptionRequired && !subscription && (
        <div class="book__pill book__pill--subscription-required">Premium</div>
      )}

      <audio
        src={audioLink}
        onLoadedMetadata={handleAudioLoadedMetadata}
      ></audio>
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
          <div className="recommended__book--details-text">{formatTimeData(audioDuration)}</div>
        </div>
        <div className="recommended__book--details">
          <div className="recommended__book--details-icon">
            <CiStar />
          </div>
          <div className="recommended__book--details-text">{averageRating.toFixed(1)}</div>
        </div>
      </div>
    </Link>
  );
}

export default Book;
