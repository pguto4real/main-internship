import { useMutation } from "@tanstack/react-query";

import SkelentonForYou from "../../components/ui/skelenton/SkelentonForYou";
import SkelentonBook from "../../components/ui/skelenton/SkelentonBook";
import BooksSection from "../../components/BooksSection";

import { AIContext } from "../../Helpers/Context";
import iconMapping from "../../utils/iconMapping";
import React, { useContext, useEffect, useState } from "react";
import {
  recomendedSection,
  selectedSection,
  suggestedSection,
} from "../../functions/fetDataFunctions";
import Link from "next/link";
import formatTimeMins from "../../hook/formatTimeMins";

function Fea() {
  const { isCheckingUser, setIsCheckingUser } = useContext(AIContext);
  const [selected, setIsSelected] = useState([]);
  const [books, setBooks] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [selectedAudioudioDuration, setSelectedAudioDuration] = useState(null);
  // console.log(object)

  // get selected books
  const { mutate: selectedSectionMutate, isPending: isSelectedPending } =
    useMutation({
      mutationFn: selectedSection,

      onSuccess: (data) => {
        setIsSelected(data);
      },
    });
  // get recomended books
  const { mutate: recomendedSectionMutate, isPending: isRecomendedPending } =
    useMutation({
      mutationFn: recomendedSection,

      onSuccess: (data) => {
        setBooks(data);
      },
    });
  // get suggested books
  const { mutate: suggestedSectionMutate, isPending: isSuggestedPending } =
    useMutation({
      mutationFn: suggestedSection,

      onSuccess: (data) => {
        setSuggested(data);
      },
    });
  useEffect(() => {
    selectedSectionMutate();
    recomendedSectionMutate();
    suggestedSectionMutate();
  }, []);
  const handleSelectedAudioLoadedMetadata = (event) => {
    const duration = event.target.duration;
    setSelectedAudioDuration(duration);
  };
  const { formatTimeMinData } = formatTimeMins();
  const FaPlayCircle = iconMapping["FaPlayCircle"];
  const IoTimeOutline = iconMapping["IoTimeOutline"];
  const CiStar = iconMapping["CiStar"];
  return (
    <>
      <div className="for-you__wrapper">
        {isSelectedPending ? (
          <SkelentonForYou />
        ) : (
          <>
            <div className="for-you__title">Selected just for you</div>
            <audio
              src={selected.audioLink}
              onLoadedMetadata={handleSelectedAudioLoadedMetadata}
            ></audio>

            <Link className="selected__book" href={`/book/${selected.id}`}>
              <div className="selected__book--sub-title">
                {selected.subTitle}
              </div>
              <div className="selected__book--line"></div>
              <div className="selected__book--content">
                <figure className="book__image--wrapper !h-[140px] !w-[140px] min-w-[140px]">
                  <img
                    className="book__image block"
                    src={selected.imageLink}
                    alt="book"
                  />
                </figure>
                <div className="selected__book--text">
                  <div className="selected__book--title">{selected.title}</div>
                  <div className="selected__book--author">
                    {selected.author}
                  </div>
                  <div className="selected__book--duration-wrapper">
                    <div className="selected__book--icon">
                      <FaPlayCircle />
                    </div>
                    <div className="selected__book--duration">
                   {formatTimeMinData(selectedAudioudioDuration)}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </>
        )}
        <div>
          {isRecomendedPending ? (
            <SkelentonBook
              title={"Recommended For You"}
              sub_title={"We think you’ll like these"}
            />
          ) : (
            <BooksSection
              title={"Recommended For You"}
              sub_title={"We think you’ll like these"}
              books={books}
            />
          )}
        </div>
        <div>
          {isSuggestedPending ? (
            <SkelentonBook
              title={"Suggested Books"}
              sub_title={"Browse those books"}
            />
          ) : (
            <BooksSection
              title={"Suggested Books"}
              sub_title={"Browse those books"}
              books={suggested}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Fea;
Fea.showWrapperFull = false;

Fea.showFonts = false;
