import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


export default function Footer() {
    return(
        <>
        <div className="flex flex-row md:w-[1152px]  mx-auto justify-start items-center mt-10  ">
            <div>Let's connect</div>
            <div className="p-2"><div><FaSquareXTwitter /></div>
           </div>
            <div className="p-2"><div><FaLinkedin /></div></div>
            <div className="p-2"> <div><FaGithub /></div></div>
            
        </div>
            <div className="flex  md:w-[1152px]  mx-auto justify-start items-center mt-10 text-xs "> @ 2026 Zellr</div>
        
        </>


    )
}