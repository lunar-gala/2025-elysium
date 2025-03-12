"use client"

import localFont from "next/font/local";
import modelData from "../teams/model.json";
import publicRelationsData from "../teams/publicRelations.json";
import productionData from "../teams/production.json";
import hairMakeupData from "../teams/hairMakeup.json";
import designData from "../teams/design.json";
import danceData from "../teams/dance.json";
import execData from "../teams/exec.json";
import creativeData from "../teams/creative.json";


const greyMonoTrial = localFont({
  src: "../../fonts/GreyMonoLLTrialWeb-Book.woff2",
  variable: "--font-grey-mono-trial",
});

const categoryDataMap = {
    "Model": modelData,
    "Public Relations": publicRelationsData,
    "Production": productionData,
    "Hair and Makeup": hairMakeupData,
    "Design": designData,
    "Dance": danceData,
    "Exec": execData,
    "Creative": creativeData
  };

const PeopleGrid = ({ refs, categories }) => {
    return (
        <div>
        {categories.map((category) => (
            <div key={category} id={category} ref={refs[category]} className="mb-[250px] scroll-mt-[250px] mr-[40px]">
            <div className="grid grid-cols-2 sm:grid-cols-12 gap-[10px]">
                {categoryDataMap[category].map((person, index) => (
                <div key={index} className="justify-left col-span-1 sm:col-span-3">
                    <img src={person.imagePath} alt={person.name} className="w-full" />
                    <p className={`mt-2 text-white text-opacity-40 text-justify ${greyMonoTrial.className} text-sm 
            font-medium leading-[16.8px] 
            tracking-[-0.56px] uppercase`}>{person.name}</p>
                    <p className={`mb-4 text-gray-400 text-opacity-40 ${greyMonoTrial.className} text-sm 
            font-medium leading-[16.8px] 
            tracking-[-0.56px] uppercase`}>{person.position}</p>
                </div>
                ))}
            </div> 
            </div>
        ))}
        </div>
    );
};

export default PeopleGrid;