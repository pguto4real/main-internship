import Book from "@/components/Book";
import BooksSection from "@/components/BooksSection";
import iconMapping from "@/utils/iconMapping";
import React from "react";

function Fea() {
  const books = [
    {
      img: "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fcant-hurt-me.png?alt=media&amp;token=026646b0-40f8-48c4-8d32-b69bd5b8f700",

      audio:
        "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Faudios%2Fcan't-hurt-me.mp3?alt=media&amp;token=7de57406-60ca-49d6-9113-857507f48312",
    },
    {
      img: "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fmastery.png?alt=media&amp;token=c41aac74-9887-4536-9478-93cd983892af",
      audio:
        "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Faudios%2Fcan't-hurt-me.mp3?alt=media&amp;token=7de57406-60ca-49d6-9113-857507f48312",
    },
    {
      img: "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fatomic_habits.png?alt=media&amp;token=51401979-e7cc-40c4-87fa-3b27d1fe761b",
      audio:
        "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Faudios%2Fcan't-hurt-me.mp3?alt=media&amp;token=7de57406-60ca-49d6-9113-857507f48312",
    },
    {
      img: "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fhow-to-talk-to-anyone.png?alt=media&amp;token=48f77463-a093-42b4-8f1f-82fa4edd044c",
      audio:
        "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Faudios%2Fcan't-hurt-me.mp3?alt=media&amp;token=7de57406-60ca-49d6-9113-857507f48312",
    },
    {
      img: "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fgood-to-great.png?alt=media&amp;token=b906ec52-7871-411f-b5b6-53f1da98ee27",
      audio:
        "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Faudios%2Fcan't-hurt-me.mp3?alt=media&amp;token=7de57406-60ca-49d6-9113-857507f48312",
    },
  ];
  const FaPlayCircle = iconMapping["FaPlayCircle"];
  const IoTimeOutline = iconMapping["IoTimeOutline"];
  const CiStar = iconMapping["CiStar"];
  return (
    <div class="for-you__wrapper">
      <div class="for-you__title">Selected just for you</div>
      <audio src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Faudios%2Fthe-lean-startup.mp3?alt=media&amp;token=c2f2b1d4-eaf2-4d47-8c8a-7a8fd062a47e"></audio>
      <a class="selected__book" href="/book/f9gy1gpai8">
        <div class="selected__book--sub-title">
          How Constant Innovation Creates Radically Successful Businesses
        </div>
        <div class="selected__book--line"></div>
        <div class="selected__book--content">
          <figure class="book__image--wrapper !h-[140px] !w-[140px] min-w-[140px]">
            <img
              class="book__image block"
              src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fthe-lean-startup.png?alt=media&amp;token=087bb342-71d9-4c07-8b0d-4dd1f06a5aa2"
              alt="book"
            />
          </figure>
          <div class="selected__book--text">
            <div class="selected__book--title">The Lean Startup</div>
            <div class="selected__book--author">Eric Ries</div>
            <div class="selected__book--duration-wrapper">
              <div class="selected__book--icon">
                <FaPlayCircle />
              </div>
              <div class="selected__book--duration">3 mins 23 secs</div>
            </div>
          </div>
        </div>
      </a>
      <div>
      <BooksSection title={"Recommended For You"} sub_title={"We think you’ll like these"} books={books} />
     
      </div>
      <div>
      <BooksSection title={"Suggested Books"} sub_title={"Browse those books"} books={books} />
     
        
      </div>
    </div>
  );
}

export default Fea;
