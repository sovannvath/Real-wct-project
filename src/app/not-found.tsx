  
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen flex-col bg-[#1f242d] text-white">
      
     <h1 className="mb-[3em] text-4xl">
      This page is not availble right now Click the button to move to another page 
     </h1>
      <Link href="/">
      <button className="btn">Back to home</button>
      </Link>
    </div>
  );
}