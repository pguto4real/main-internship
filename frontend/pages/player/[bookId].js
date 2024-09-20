import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { getBookById } from "../../functions/fetDataFunctions";
import iconMapping from "../../utils/iconMapping";
import { useRouter } from "next/router";
import { AIContext } from "../../Helpers/Context";

const BookDetails = ({ initialBookData, bookId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    isLoggedIn,
    fontSize,
    setIsModalOpen,
    isModalOpen,

  } = useContext(AIContext);

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
  } = initialBookData;
  console.log(initialBookData);
  const RiForward10Fill = iconMapping["RiForward10Fill"];
  const RiReplay10Line  = iconMapping["RiReplay10Line"];
  const FaRegCirclePlay  = iconMapping["FaRegCirclePlay"];
  
  useEffect(() => {
    // subscriptionRequired && router.push("/choose-plan");
  }, []);
  return (
    <div class="summary">
      <div class={`audio__book--summary ${fontSize}`} >
        <div class="audio__book--summary-title">
          <b>How to Win Friends and Influence People in the Digital Age</b>
        </div>
        <div class="audio__book--summary-text">
          How to Win Friends and Influence People is a timeless classic written
          by Dale Carnegie, first published in 1936. The book is widely regarded
          as one of the best self-help books ever written and has sold over 30
          million copies worldwide. In 2011, a revised edition was published,
          titled How to Win Friends and Influence People in the Digital Age. The
          book was updated to address the challenges of the digital age and
          provide guidance on how to navigate the complexities of modern
          communication and social media. The original book focused on the art
          of human communication and provided readers with strategies for
          building strong relationships, overcoming interpersonal conflicts, and
          becoming more effective communicators. The revised edition builds on
          these principles and updates them for the digital age. The book
          recognizes that the proliferation of technology and social media has
          created new opportunities for communication and connection, but has
          also made it more difficult to connect with others on a deep and
          meaningful level. The first section of the book is devoted to building
          relationships in the digital age. The author argues that despite the
          abundance of social media platforms, people are more isolated than
          ever before. He suggests that the key to building strong relationships
          is to focus on the needs and desires of others. He encourages readers
          to listen actively and empathetically, to show genuine interest in
          others, and to be generous with their time and resources. These
          strategies apply both online and offline and are essential for
          building strong relationships in the digital age. The second section
          of the book focuses on communicating effectively in the digital age.
          The author acknowledges that modern communication technology has made
          it easier than ever to communicate with others, but has also made it
          more difficult to convey complex emotions and ideas. He suggests that
          the key to effective communication is to be clear and concise, to use
          simple language and avoid jargon, and to be mindful of the tone and
          style of your message. He also stresses the importance of using
          technology appropriately, and suggests that people should avoid using
          text messaging and email for important conversations, as they are less
          personal and can easily be misinterpreted. The third section of the
          book focuses on influencing others in the digital age. The author
          argues that in the digital age, influence is more important than ever
          before. He suggests that the key to influencing others is to be
          genuine and authentic, to communicate your message clearly and
          persuasively, and to be mindful of the needs and desires of your
          audience. He also stresses the importance of building a personal
          brand, and suggests that people should focus on developing a strong
          online presence that reflects their values and expertise. The final
          section of the book focuses on leadership in the digital age. The
          author argues that in the digital age, leaders must be able to inspire
          and motivate their followers, and must be able to navigate the complex
          and rapidly changing world of technology and social media. He suggests
          that the key to effective leadership is to be a good listener, to be
          open to new ideas and perspectives, and to be willing to take risks
          and try new approaches. He also stresses the importance of building a
          strong team, and suggests that leaders should focus on creating a
          culture of collaboration and innovation. Overall, How to Win Friends
          and Influence People in the Digital Age is an excellent guide for
          anyone looking to improve their communication skills, build strong
          relationships, and become more effective leaders in the digital age.
          The book provides readers with practical strategies and advice for
          navigating the complex world of modern communication and social media,
          and is an essential resource for anyone looking to succeed in today's
          rapidly changing world.
        </div>
      </div>
      <div class="audio__wrapper">
        <audio src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Faudios%2Fhow-to-win-friends-and-influence-people.mp3?alt=media&amp;token=60872755-13fc-43f4-8b75-bae3fcd73991"></audio>
        <div class="audio__track--wrapper">
          <figure class="audio__track--image-mask">
            <figure
              class="book__image--wrapper !h-12 !w-12 !min-w-[48px]"
       
            >
              <img
                class="book__image"
                src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fhow-to-win-friends-and-influence-people.png?alt=media&amp;token=099193aa-4d85-4e22-8eb7-55f12a235fe2"
                alt="book block"

              />
            </figure>
          </figure>
          <div class="audio__track--details-wrapper">
            <div class="audio__track--title">
              How to Win Friends and Influence People in the Digital Age
            </div>
            <div class="audio__track--author">Dale Carnegie</div>
          </div>
        </div>
        <div class="audio__controls--wrapper">
          <div class="audio__controls">
            <button class="audio__controls--btn" fdprocessedid="sgih2">
              <RiReplay10Line/>
            </button>
            <button
              class="audio__controls--btn audio__controls--btn-play"
              fdprocessedid="o867x"
            >
             <FaRegCirclePlay/>
            </button>
            <button class="audio__controls--btn" fdprocessedid="se1mvs">
            <RiForward10Fill/>
            </button>
          </div>
        </div>
        <div class="audio__progress--wrapper">
          <div class="audio__time">00:00</div>
          <input
            type="range"
            class="bg-gradient-to-r from-custom-green to-custom-gray range-progress"
            value="0"
            max="204.048"
           
          />
          <div class="audio__time">03:24</div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
BookDetails.showFonts = true;
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
