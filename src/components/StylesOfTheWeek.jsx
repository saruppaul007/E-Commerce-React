// StylesOfTheWeek Component - Modified with Individual Card Navigation
import React from "react";
import { useNavigate } from "react-router-dom";
import PageSection from "./pageSection";
import Title from "./Title";
import style1 from "../assets/style1.png";
import style2 from "../assets/style2.png";
import style3 from "../assets/style3.png";
import style4 from "../assets/style4.png";

const StyleCard = ({ imageUrl, description, styleType, onClick }) => (
  <div
    className={`relative overflow-hidden rounded-lg group cursor-pointer transition-transform duration-300 hover:scale-105 aspect-square`}
    style={{
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
    onClick={onClick}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
    <div className="relative h-full p-6 flex flex-col justify-end pb-16">
      <div className="text-center">
        {description && (
          <p className="text-md text-white uppercase tracking-wide font-bold drop-shadow-lg italiana-regular">
            {description}
          </p>
        )}
      </div>
    </div>
  </div>
);

const StylesOfTheWeek = () => {
  const navigate = useNavigate();
  
  const styles = [
    {
      description: "BOLD & EDGY",
      imageUrl: style1,
      styleType: "bold-edgy"
    },
    {
      description: "MADE FOR BIG MOVES",
      imageUrl: style2,
      styleType: "big-moves"
    },
    {
      description: "EFFORTLESS STYLE",
      imageUrl: style3,
      styleType: "effortless"
    },
    {
      description: "ADVENTURE READY",
      imageUrl: style4,
      styleType: "adventure"
    },
  ];

  const handleStyleClick = (styleType) => {
    // Navigate to collection page with style filter
    navigate(`/collection?style=${styleType}`);
  };

  const handleShopAllStyles = () => {
    navigate("/collection");
  };

  return (
    <PageSection>
      <div className="bg-white py-0 px-0"> {/* Reduced from min-h-screen and py-1 */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center py-4 text-3xl">
            <Title text1={"STYLES OF"} text2={"THE WEEK"} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {styles.map((style, index) => (
              <StyleCard 
                key={index} 
                {...style} 
                onClick={() => handleStyleClick(style.styleType)}
              />
            ))}
          </div>
          <div className="text-center mt-8 mb-4"> {/* Reduced from mt-12 to mt-8, added mb-4 */}
            <button
              onClick={handleShopAllStyles}
              className="bg-[--peach] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[--peach-dark] transition-colors duration-300 shadow-lg instrument-sans-regular"
            >
              SHOP ALL STYLES
            </button>
          </div>
        </div>
      </div>
      <hr />
    </PageSection>
  );
};

export default StylesOfTheWeek;