export default function Footer(){
    const year = new Date().getFullYear();
    return (
        <p className="flex justify-center h-10 p-3">
            &copy; {year}<strong className="ml-1"> Peer Faizan</strong>. All rights reserved.
        </p>
    )
}