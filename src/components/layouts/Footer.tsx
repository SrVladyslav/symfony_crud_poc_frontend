import React from 'react'
import { FaGithub } from "react-icons/fa";

const Footer =()=>{
    return (
        <div className="relative w-full flex justify-center items-center flex-col gap-1">
            <p className="text-center text-[var(--foreground)] text-sm mt-20">
                &copy; {new Date().getFullYear()} Vlamaz | Symfony CRUD POC
            </p>
            <a href="https://github.com/SrVladyslav/symfony_crud_poc_frontend" target="_blank" rel="noreferrer">
                <FaGithub />
            </a>
        </div>
    )
}

export default Footer