import React from 'react';

const TitleSameWord = ({ text }) => {
  return (
    <div className="inline-flex items-center mb-3">
      <p className="text-black">
        {text}
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-black"></p>
    </div>
  );
};

export default TitleSameWord;
