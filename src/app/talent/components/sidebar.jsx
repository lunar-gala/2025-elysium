"use client"

import localFont from "next/font/local";

const greyMonoTrial = localFont({
  src: "../../fonts/GreyMonoLLTrialWeb-Book.woff2",
  variable: "--font-grey-mono-trial",
});

const Sidebar = ({selected, categories}) => {
  const handleClick = (category) => {
    document.getElementById(category)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="sticky top-[250px] align-self: start">
      <div className="relative">
  <div 
    className="w-[2px] bg-gray-700 transition-all duration-300" 
    style={{ height: `115px` }}
  ></div>
  <ul className="text-gray-500 absolute top-0 left-0 w-full">
    {categories.map((category) => (
      <li key={category}>
        <div className="flex items-center space-x-2">
        {selected === category && (
          <div className="flex items-center justify-left">
            {/* Vertical line*/}
            <div className="w-[2px] h-[20px] bg-white"></div>
            {/* Horizontal line */}
            <div className="w-[10px] h-[2px] bg-white"></div>
          </div>
        )}
          <button
            onClick={() => handleClick(category)}
            className={`cursor-pointer transition-colors duration-200 ${
              selected === category ? "text-white text-opacity-40" : "text-gray"
            } hover:text-white ml-4 text-justify ${greyMonoTrial.className} text-sm 
            font-medium leading-[16.8px] 
            tracking-[-0.56px] uppercase`}
          >
            {category}
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>
    </div>
  );
};

export default Sidebar;