"use client"
import { is } from "date-fns/locale";
import { CrossIcon, Ellipsis } from "lucide-react";
import { useState, useEffect, useRef } from "react";


export default function EllipsisMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const handleDelete = () => {
        // Handle delete action
    };

    useEffect(() => {
        const handlePointerDownOutside = (event: PointerEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleMouseDownOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("pointerdown", handlePointerDownOutside);
            document.addEventListener("mousedown", handleMouseDownOutside);
        }

        return () => {
            document.removeEventListener("pointerdown", handlePointerDownOutside);
            document.removeEventListener("mousedown", handleMouseDownOutside);
        };
    }, [isOpen])
    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {isOpen ? ( <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              onClick={() => setIsOpen(!isOpen)}
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
                <div ref={menuRef} className="absolute right-0 top-full z-20 bg-white rounded-lg shadow-2xl border border-gray-200 mt-2 min-w-48 overflow-hidden">
                    <ul className="py-2">
                        <li className="cursor-pointer hover:bg-gray-50 px-4 py-3 text-gray-700 hover:text-gray-900 transition-colors duration-200 flex items-center space-x-3">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                            </svg>
                            <span>Share Post</span>
                        </li> 
                        <li className="cursor-pointer hover:bg-gray-50 px-4 py-3 text-gray-700 hover:text-gray-900 transition-colors duration-200 flex items-center space-x-3">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span>Edit Post</span>
                        </li>
                        <div className="border-t border-gray-100 my-1"></div>
                        <li onClick={()=> setIsMessageOpen(true)} className="cursor-pointer hover:bg-red-50 px-4 py-3 text-red-600 hover:text-red-700 transition-colors duration-200 flex items-center space-x-3">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span>Delete Post</span>
                        </li>
                    </ul>
                </div>
            )}
            {isMessageOpen && (
                <>
                    <div className="fixed inset-0 bg-trasparent bg-opacity-50 z-40" onClick={() => setIsMessageOpen(false)}></div>
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-2xl border border-gray-200 p-6 max-w-sm w-full mx-4">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Post</h3>
                            <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
                        </div>
                        <div className="flex space-x-3">
                            <button 
                                onClick={() => setIsMessageOpen(false)} 
                                className="cursor-pointer flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleDelete} 
                                className="cursor-pointer flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}