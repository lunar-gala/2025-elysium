"use client"

import localFont from "next/font/local";

const greyMonoTrial = localFont({
  src: "../../fonts/GreyMonoLLTrialWeb-Book.woff2",
  variable: "--font-grey-mono-trial",
});

const people = Array(8).fill({ name: "First Last", img: "sample_img.png", position: "position" });


const PeopleGrid = ({ refs, categories }) => {
    return (
        <div>
        {categories.map((category) => (
            <div key={category} id={category} ref={refs[category]} className="mb-[250px] scroll-mt-[250px] mr-[40px]">
            <div className="grid grid-cols-2 sm:grid-cols-12 gap-[10px]">
                {people.map((person, index) => (
                <div key={index} className="justify-left col-span-1 sm:col-span-3">
                    <img src="sample_img.png" alt={person.name} className="w-full" />
                    <p className={`mt-2 text-white text-opacity-40 text-justify ${greyMonoTrial.className} text-sm 
            font-medium leading-[16.8px] 
            tracking-[-0.56px] uppercase`}>{person.name}</p>
                    <p className={`mb-4 text-gray-400 text-opacity-40 text-justify ${greyMonoTrial.className} text-sm 
            font-medium leading-[16.8px] 
            tracking-[-0.56px] uppercase`}>{category}</p>
                </div>
                ))}
            </div>
            </div>
        ))}
        </div>
    );
};

export default PeopleGrid;