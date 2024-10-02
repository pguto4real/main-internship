import React from "react";
import Skeleton from "./Skeleton";

function SearchSkelentons() {
  return (
    <div class="search__books--wrapper">
      {new Array(7).fill(0).map((_, index) => (
        <Skeleton key={index} height={"120px"} width={"100%"} borderRadius={0}  marginBottom />
        // <div class="skeleton w-[100%] h-[120px] mb-2"></div>
      ))}
    </div>
  );
}

export default SearchSkelentons;

{
  /* <div class="search__books--wrapper"><div class="skeleton" style="width: 100%; height: 120px; margin-bottom: 8px;"></div><div class="skeleton" style="width: 100%; height: 120px; margin-bottom: 8px;"></div><div class="skeleton" style="width: 100%; height: 120px; margin-bottom: 8px;"></div><div class="skeleton" style="width: 100%; height: 120px; margin-bottom: 8px;"></div><div class="skeleton" style="width: 100%; height: 120px;"></div></div> */
}
