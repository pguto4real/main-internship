import React from "react";

import iconMapping from "../../utils/iconMapping";

function BooksSectionLoading({ title,comment}) {
    const AiOutlineLoading3Quarters = iconMapping["AiOutlineLoading3Quarters"];
  return (
    <>
      <div className="for-you__title">{title}</div>
      <div className="for-you__sub--title"></div>
      <div className="for-you__recommended--books">
      <button
          type="button"
          class="w-full flex items-center justify-center"
          disabled
        >
          <AiOutlineLoading3Quarters  className="animate-spin h-10 w-10 mr-3 ..." />
         {comment} ...
        </button>
      </div>
    </>
  );
}

export default BooksSectionLoading;
