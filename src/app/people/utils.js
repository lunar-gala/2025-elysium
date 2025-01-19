import React from "react";
import { useRouter } from 'next/navigation';
import "./utils.css"

const BackButton = ({prevText, prevURL = "/"}) => {
    const router = useRouter();

    const handleClick = () => {
        console.log("Navigating back");
        router.push(`${prevURL}`); 
    };

    return (
        <div className="back-button-container" onClick={handleClick}>
        <div className="flex justify-center items-center w-7 h-7 border-2 border-white rounded-full">
            <span className="text-white text-m">&lt;</span>
        </div>
        <span className="backButton">{prevText}</span>
        </div>
    );
};

export default BackButton;