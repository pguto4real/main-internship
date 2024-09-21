import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { getBookById } from "../../functions/fetDataFunctions";
import iconMapping from "../../utils/iconMapping";
import { useRouter } from "next/router";
import { AIContext } from "../../Helpers/Context";
import useFireStore from "../../hook/useFirestore";

const BookDetails = ({ initialBookData, bookId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isLoggedIn, currentUser, setIsModalOpen, isModalOpen,bookExist,
    setBookExist } =
    useContext(AIContext);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  // Fetch book data with useQuery
  const { data: bookData, isLoading: isFetching } = useQuery({
    queryKey: ["book", bookId], // The query key
    queryFn: () => getBookById(bookId), // The query function
    initialData: initialBookData, // Initial data from getServerSideProps
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }
  const {
    audioLink,
    author,
    authorDescription,
    averageRating,
    bookDescription,
    id,
    imageLink,
    keyIdeas,
    status,
    subTitle,
    subscriptionRequired,
    summary,
    tags,
    title,
    totalRating,
    type,
  } = initialBookData;
  // console.log(initialBookData);
  const IoTimeOutline = iconMapping["IoTimeOutline"];
  const CiStar = iconMapping["CiStar"];
  const AiOutlineAudio = iconMapping["AiOutlineAudio"];
  const HiOutlineLightBulb = iconMapping["HiOutlineLightBulb"];
  const SlBookOpen = iconMapping["SlBookOpen"];
  const FaBookmark = iconMapping["FaBookmark"];
  const FaRegBookmark = iconMapping["FaRegBookmark"];

  const navigateToPlayer = () => {
    router.push(`/player/${id}`);
  };

  const addOrRemoveBook = () => {
 
    saveToLibrary(bookToSave, currentUser);
  };

  const { saveToLibrary, isBookExist } = useFireStore(currentUser);
  const bookToSave = {
    id: id,
    author: author,
    title: title,
    subTitle: subTitle,
    imageLink: imageLink,
    audioLink: audioLink,
    authorDescription: authorDescription,
    averageRating: averageRating,
    bookDescription: bookDescription,
    keyIdeas: keyIdeas,
    status: status,
    subscriptionRequired: subscriptionRequired,
    summary: summary,
    tags: tags,
    totalRating: totalRating,
    type: type,
    userId: currentUser?.uid,
  };

  // console.log(currentUser)
  useEffect(() => {
    const saveBookData = async () => {
      if (currentUser?.uid) {
        const bookeExist = isBookExist(bookToSave, currentUser);
   
      }
    };

    saveBookData();
  }, [currentUser,isBookExist]);
  return (
    <div class="inner__wrapper">
      <div class="inner__book">
        <div class="inner-book__title">{title} </div>
        <div class="inner-book__author">{author}</div>
        <div class="inner-book__sub--title">{subTitle}</div>
        <div class="inner-book__wrapper">
          <div class="inner-book__description--wrapper">
            <div class="inner-book__description">
              <div class="inner-book__icon">
                <CiStar />
              </div>
              <div class="inner-book__overall--rating">
                {averageRating}&nbsp;
              </div>
              <div class="inner-book__total--rating">
                ({totalRating}&nbsp;ratings)
              </div>
            </div>
            <div class="inner-book__description">
              <div class="inner-book__icon">
                <IoTimeOutline />
              </div>
              <div class="inner-book__duration">03:24</div>
            </div>
            <div class="inner-book__description">
              <div class="inner-book__icon">
                <AiOutlineAudio />
              </div>
              <div class="inner-book__type">Audio &amp; Text</div>
            </div>
            <div class="inner-book__description">
              <div class="inner-book__icon">
                <HiOutlineLightBulb />
              </div>
              <div class="inner-book__key--ideas">{keyIdeas} Key ideas</div>
            </div>
          </div>
        </div>
        <div class="inner-book__read--btn-wrapper">
          {isLoggedIn ? (
            <>
              <button
                class="inner-book__read--btn"
                fdprocessedid="ny95gb"
                onClick={navigateToPlayer}
              >
                <div class="inner-book__read--icon">
                  <SlBookOpen />
                </div>

                <div class="inner-book__read--text">Read</div>
              </button>
              <button
                class="inner-book__read--btn"
                fdprocessedid="cmcbun"
                onClick={navigateToPlayer}
              >
                <div class="inner-book__read--icon">
                  <AiOutlineAudio />
                </div>
                <div class="inner-book__read--text">Listen</div>
              </button>
            </>
          ) : (
            <>
              <button
                class="inner-book__read--btn"
                fdprocessedid="ny95gb"
                onClick={() => toggleModal()}
              >
                <div class="inner-book__read--icon">
                  <SlBookOpen />
                </div>

                <div class="inner-book__read--text">Read</div>
              </button>
              <button
                class="inner-book__read--btn"
                fdprocessedid="cmcbun"
                onClick={() => toggleModal()}
              >
                <div class="inner-book__read--icon">
                  <AiOutlineAudio />
                </div>
                <div class="inner-book__read--text">Listen</div>
              </button>
            </>
          )}
        </div>
        {bookExist ? (
          <div class="inner-book__bookmark" onClick={addOrRemoveBook}>
            <div class="inner-book__bookmark--icon">
              <FaBookmark />
            </div>

            <div class="inner-book__bookmark--text">Saved in My Library</div>
          </div>
        ) : (
          <div class="inner-book__bookmark" onClick={addOrRemoveBook}>
            <div class="inner-book__bookmark--icon">
              <FaRegBookmark />
            </div>

            <div class="inner-book__bookmark--text">
              Add title to My Library
            </div>
          </div>
        )}

        <div class="inner-book__secondary--title">What's it about?</div>
        <div class="inner-book__tags--wrapper">
          {tags.map((tag, index) => (
            <div key={index} className="inner-book__tag">
              {tag}
            </div>
          ))}
        </div>
        <div class="inner-book__book--description">{bookDescription}</div>
        <h2 class="inner-book__secondary--title">About the author</h2>
        <div class="inner-book__author--description">{authorDescription}</div>
      </div>
      <div class="inner-book--img-wrapper">
        <figure class="book__image--wrapper !h-[300px] !w-[300px] !min-h-[300px]">
          <img
            class="book__image"
            src={imageLink}
            alt="book"
            className=" block"
          />
        </figure>
      </div>
    </div>
  );
};

export default BookDetails;
BookDetails.showWrapperFull = false;
BookDetails.showFonts = false;
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
