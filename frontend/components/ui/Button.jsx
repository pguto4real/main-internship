import iconMapping from "@/utils/iconMapping";
import dynamic from "next/dynamic";
import React from "react";

function Button({
  text,
  icon,
  width,
  height,
  fontSize,
  textColor,
  backGroundColor,
  hover,
}) {
  const IconComponent = iconMapping[icon];
  return (
    <button
      className={`
        rounded
     ${width === "full" ? "w-full" : `w-[${width}]`}
    ${height === "full" ? "h-full" : `h-${height}`}
      text-[${fontSize}] 
      flex 
      items-center 
      justify-center 
      min-w-[180px] 
      transition-colors 
      duration-200 
      relative  
      bg-[${backGroundColor}] 
      text-[${textColor}] 
      disabled:hover:bg-transparent
      ${hover && `hover:bg-[${hover}]`}
     `}
    >
      <figure
        className={`flex items-center justify-center w-9 h-9 rounded bg-white absolute left-0.5 bg-transparent`}
      >
        <IconComponent />
      </figure>
      <div>{text}</div>
    </button>
  );
}

export default Button;
