import React from "react";
import image from "../../assets/Subheader.png";

interface SubHeaderProps {
  text: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({ text }) => {
  return (
    <div className="relative w-full text-white">
      <img src={image} alt="Subheader background" className="w-full h-[80px]" />
      <h2 className="absolute inset-0 flex items-center  px-10 text-2xl font-bold text-white">
        {text}
      </h2>
    </div>
  );
};

export default SubHeader;
