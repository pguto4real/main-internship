import React from "react";

const Input = ({
  placeholder,
  value,
  type,
  disabled,
  onChange,
}) => {
  return (
    <input
      type={type}
      disabled={disabled}
      onChange={onChange}
      placeholder={placeholder}
      className=" h-[40px] border-2 rounded-md text-[#394547] py-0 px-3 outline-none
      focus:border-[#2bd97c]
      "
       value={value}
    />
  );
};


export default Input;
// w-full p-4 text-lg bg-black border-2
//        border-neutral-800
//        rounded-md outline-none
//        text-white focus:border-sky-500 
//        focus:border-2 transition
//         disabled:bg-neutral-900
//         disabled:opacity-70
//         disabled:cursor-not-allowed