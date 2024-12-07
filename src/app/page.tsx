import Image from "next/image";
import Navbar from "@/components/toolsbar";
import { Button } from "@/components/ui/button" ;


export default function Home() {
  return (
    <>
    <Navbar></Navbar>
    <Button className="bg-red-800 ">Click me</Button>

    </>
  );
}
