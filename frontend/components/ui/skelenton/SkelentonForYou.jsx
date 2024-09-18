import Skeleton from "./Skeleton";

function SkelentonForYou() {
  return (
    <div className="for-you__wrapper">
      <div className="for-you__title">Select just for you</div>
      <Skeleton height={200} width={"65%"} />
    </div>
  );
}

export default SkelentonForYou;
