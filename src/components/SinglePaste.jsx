import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

function ViewPaste() {
    const { id } = useParams();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const pastes = useSelector((state) => state.paste.pastes);
    const paste = pastes.find((paste) => paste.pasteId === id);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-300 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-gradient-to-br from-gray-40 to-gray-200 rounded-xl shadow-lg p-6 space-y-6 md:rounded-2xl md:p-8 md:space-y-8 transition-all duration-200 hover:shadow-xl">
                    {/* Header */}
                    <div className="flex items-center space-x-3">
                        <svg
                            className="w-8 h-8 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.4145.414A1 1 0 0119 5.414V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        <h1 className="text-gray-800 text-2xl font-bold md:text-3xl">
                            View Paste
                        </h1>
                    </div>

                    <div className="space-y-6 md:space-y-8">
                        {/* Title Section */}
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <label className="text-gray-600 text-base font-medium md:text-lg">
                                    Title
                                </label>
                                <svg
                                    className="w-4 h-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Paste Title"
                                disabled
                                className="w-full px-4 py-3 text-base md:text-lg text-gray-800 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 disabled:opacity-75 disabled:cursor-not-allowed transition-all"
                                value={paste.title}
                            />
                        </div>

                        {/* Content Section */}
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <label className="text-gray-600 text-base font-medium md:text-lg">
                                    Content
                                </label>
                                <svg
                                    className="w-4 h-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                    />
                                </svg>
                            </div>
                            <textarea
                                placeholder="Your paste content here..."
                                disabled
                                className="w-full px-4  py-3 text-gray-800 text-base md:text-lg bg-gray-50 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-200 disabled:opacity-75 disabled:cursor-not-allowed transition-all"
                                value={paste.content}
                                rows={(paste.content.length)/49}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewPaste

