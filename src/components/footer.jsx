export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-gradient-to-br from-gray-60 to-gray-400 text-gray-800 p-5">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <p className="sm:text-lg text-sm">
                    &copy; {year} <strong>Peer Faizan</strong>. All rights reserved.
                </p>
                <ul className="flex gap-4 mt-2 ">
                    <li>
                        <a
                            href="https://www.linkedin.com/in/faizan-syed-4370152b9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                            aria-label="LinkedIn Profile"
                            target="_blank"
                        >
                            <img
                                className="h-6 w-6 sm:h-7 sm:w-7 hover:scale-150 transition-transform duration-200"
                                src="/assets/linkedin.png"
                                alt="LinkedIn"
                            />
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://github.com/Faizan-313/Paste-App"
                            aria-label="GitHub Profile"
                            target="_blank"
                        >
                            <img
                                className="h-6 w-6 sm:h-7 sm:w-7 hover:scale-150 transition-transform duration-200"
                                src="/assets/github.png"
                                alt="GitHub"
                            />
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );

}