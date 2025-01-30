import React, { useState } from 'react'
import toast from 'react-hot-toast';

function Share(prop) {
    const link = `https://paste-app-eight-kappa.vercel.app/paste/${prop.id.current}`

    function Copy() {
        navigator.clipboard.writeText(link);
        toast.success('Copied to Clipboard');
        prop.close();
    }

    return (
        <div className="fixed inset-0 z-50 backdrop-blur-[4px] transition-all duration-100">
            <div className="fixed bg-gradient-to-br from-gray-50 to-gray-300  left-1/2 top-1/2 z-50 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl transition-all sm:max-w-md">
                <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                Share Link
                            </h2>
                            <p className="text-sm text-gray-500 sm:text-base">
                                Anyone with this link can view the content.
                            </p>
                        </div>
                        <button
                            className="rounded-full p-2 transition-all hover:bg-gray-100"
                            onClick={prop.close}
                            title='close'
                        >
                            <span className="sr-only">Close</span>
                            <svg
                                className="h-5 w-5"
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
                            </svg>
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="space-y-4">
                        <div className="flex bg-gray-100 items-center space-x-2 rounded-lg border border-gray-200  p-3">
                            <div className="truncate bg-gradient-to-br from-gray-50 to-gray-300  w-[90%] text-gray-600 px-3 py-1 border rounded-lg bg-gray-50">
                                {link}
                            </div>

                            <button
                                onClick={Copy}
                                className="ml-auto shrink-0 rounded-md bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-300">
                                Copy
                            </button>
                        </div>
                    </div>
                    <p className='text-gray-500 text-center'>Currently the link will not work as expected!</p>
                </div>
            </div>
        </div>
    );
}

export default Share
