"use client"
import { CrossIcon, Ellipsis } from "lucide-react";
import { useState } from "react";


export default function EllipsisMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => {
        setIsOpen(false);
    };
    return (
        <div className="relative">
            <button onClick={() => handleClose()} className="cursor-pointer">
                {isOpen ? ( <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>) : <Ellipsis />}
            </button>
            {isOpen && (
                <div className="absolute right-0 top-full z-10 bg-white border rounded shadow w-50 h-auto">
                    <ul className="p-2 md:text-lg">
                               <li className="cursor-pointer hover:bg-gray-100">Share Post</li> 
                        <li className="cursor-pointer hover:bg-gray-100">Edit Post</li>
                <li className="cursor-pointer hover:bg-gray-100 text-red-500">Delete Post</li>
                    </ul>
                </div>
            )}
        </div>
    )
}