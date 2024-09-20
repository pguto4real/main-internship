import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import { getBookById } from "../../functions/fetDataFunctions";
import iconMapping from "../../utils/iconMapping";
import { useRouter } from "next/router";
import { AIContext } from "../../Helpers/Context";
import NotLoggedIn from "../../components/NotLoggedIn";
import formatTime from "../../hook/formatTime";

const BookDetails = ({ initialBookData, bookId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { isLoggedIn, fontSize, setIsModalOpen, isModalOpen, subscription } =
    useContext(AIContext);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  // Fetch book data with useQuery
  const { isLoading: isFetching } = useQuery({
    queryKey: ["book", bookId], // The query key
    queryFn: () => getBookById(bookId), // The query function
    initialData: initialBookData, // Initial data from getServerSideProps
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  const {
    title,
    author,
    subTitle,
    audioLink,
    averageRating,
    bookDescription,
    id,
    imageLink,
    keyIdeas,
    totalRating,
    type,
    subscriptionRequired,
    authorDescription,
    tags,
    summary,
  } = initialBookData;

  const RiForward10Fill = iconMapping["RiForward10Fill"];
  const IoPause = iconMapping["IoPause"];
  const RiReplay10Line = iconMapping["RiReplay10Line"];
  const FaRegCirclePlay = iconMapping["FaRegCirclePlay"];

  useEffect(() => {
    setDuration(audioRef.current?.duration);

    // !subscription && subscriptionRequired && router.push("/choose-plan");
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [mediaTime, setMediaTime] = useState(0);
  const audioRef = useRef(null);
  const { formatTimeData } = formatTime();
  const togglePlaying = () => {
    setIsPlaying(!isPlaying);

    isPlaying ? audioRef.current.pause() : audioRef.current.play();
  };
  const onLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };
  const onTimeUpdate = () => {
    setMediaTime(audioRef.current.currentTime);
  };
  const onScrubberChange = (event) => {
    const newTime = event.target.value;
    setMediaTime(newTime);
    audioRef.current.currentTime = newTime;
  };
  const onRewind = () => {
    const { currentTime } = audioRef.current;
    const newTime = Math.max(currentTime - 10, 0);
    setMediaTime(newTime);
    audioRef.current.currentTime = newTime;
  };
  const onForward = () => {
    const { currentTime } = audioRef.current;
    const newTime = Math.min(currentTime + 10, duration);
    setMediaTime(newTime);
    audioRef.current.currentTime = newTime;
  };
  const handleAudioEnded = () => {
    alert('Audio has finished playing!');
  };
  
  // console.log(duration)
  // console.log(initialBookData)

  return (
    <>
      <div className="summary">
        <div className={`audio__book--summary ${fontSize}`}>
          <div className="audio__book--summary-title">
            <b>{title}</b>
          </div>
          {!isLoggedIn ? (
            <NotLoggedIn />
          ) : (
            <div className="audio__book--summary-text">{summary}</div>
          )}
        </div>
        <div className="audio__wrapper">
          <audio
            ref={audioRef}
            onLoadedMetadata={onLoadedMetadata}
            onTimeUpdate={onTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={handleAudioEnded}
            src={audioLink}
          ></audio>
          <div className="audio__track--wrapper">
            <figure className="audio__track--image-mask">
              <figure className="book__image--wrapper !h-12 !w-12 !min-w-[48px]">
                <img className="book__image" src={imageLink} alt="book block" />
              </figure>
            </figure>
            <div className="audio__track--details-wrapper">
              <div className="audio__track--title">{title}</div>
              <div className="audio__track--author">{author}</div>
            </div>
          </div>
          <div className="audio__controls--wrapper">
            <div className="audio__controls">
              <button
                className="audio__controls--btn"
                fdprocessedid="sgih2"
                onClick={onRewind}
              >
                <RiReplay10Line />
              </button>
              <button
                onClick={togglePlaying}
                className="audio__controls--btn audio__controls--btn-play"
                fdprocessedid="o867x"
              >
                {isPlaying ? <IoPause /> : <FaRegCirclePlay />}
              </button>
              <button
                className="audio__controls--btn"
                fdprocessedid="se1mvs"
                onClick={onForward}
              >
                <RiForward10Fill />
              </button>
            </div>
          </div>
          <div className="audio__progress--wrapper">
            <div className="audio__time">{formatTimeData(mediaTime)}</div>
            <input
              onChange={onScrubberChange}
              type="range"
              className="bg-gradient-to-r from-custom-green to-custom-gray range-progress"
              value={mediaTime}
              min="0"
              max={duration}
            />
            <div className="audio__time">{formatTimeData(duration)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;

BookDetails.showWrapperFull = false;
export const getServerSideProps = async (context) => {
  const { bookId } = context.params; // Extract dynamic route param
  const bookData = await getBookById(bookId);

  // Handle case where no data is found
  if (!bookData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialBookData: bookData,
      bookId: bookId, // Pass book ID to component
    },
  };
};
