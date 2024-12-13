import Navbar from "@/components/Navbar";
import React from 'react'
import Team from "./images/Team.jpg"
import "../styles/aboutus.css";
import { Metadata } from 'next'


export const metadata: Metadata = {
    title: "About our Togethertech",
    description: "About our website that provides news technology field all accross the world",
  };

 function page() { 
  return (

    <main className="bg-[#1F242B] ">
        <Navbar />
    <div className='pl-[60px] pt-[60px] '>
    <h1 className='text-white text-[20px] sm:text-[40px] inline font-bold'>We provide the latest in technology news. <br />
   </h1>
    <h1 className='text-[#6ecbc6] text-[30px] sm:text-[60px] inline font-bold' >TogetherTechs</h1><br /><br />
    </div>
    <h1 className='text-[2.2em] mb-[40px] font-bold text-white ml-[20px] sm:mt-[50px] mt-[20px]'>About us</h1>
<div className="flex flex-col lg:flex-row text-white mt-[30px] ml-[20px]">
  <div className="flex flex-col gap-[10px] sm:flex-row">
    <div>
      <h1 className='font-bold text-[1.5em]'>
        Our mission
      </h1>
      <p className='text-[1.2em]'>Ask gpt4 I don’t know hi guy welcome to my channel. I love coding HTML CSS.</p>
    </div>
    <div>
      <h1 className='font-bold text-[1.5em]'>
        Our Offer 
      </h1>
      <p className='text-[1.2em]'>Ask gpt4 I don’t know hi guy welcome to my channel. I love coding HTML CSS.</p>
    </div>
    <div>
      <h1 className='font-bold text-[1.5em]'>
        Our unique value 
      </h1>
      <p className='text-[1.2em]'>
        Ask gpt4 I don’t know hi guy welcome to my channel. I love coding HTML CSS.
      </p>
    </div> 
  </div>
</div>

   <div>
   <div className="pl-[20px] pt-[20px] sm:pl-[40px] sm:pt-[40px] lg:pl-[60px] lg:pt-[60px]">
  <h1 className="text-white text-[1.8em] sm:text-[2em] lg:text-[2.5em] inline font-bold">Our </h1>
  <h1 className="text-[#6ecbc6] text-[1.8em] sm:text-[2em] lg:text-[2.5em] inline font-bold">Benefits</h1>
</div>
<p className="pl-[20px] pt-[20px] pr-[20px] text-white text-[1em] sm:text-[1.1em] lg:pl-[200px] lg:pt-[40px] lg:pr-[200px] lg:text-[1.2em] leading-relaxed">
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist. I love wct.
</p>


<div className="flex flex-col sm:flex-row flex-wrap gap-[15px] sm:gap-[20px] pl-[20px] sm:pl-[40px] lg:pl-[60px] pt-[20px] sm:pt-[40px] lg:pt-[60px] text-white">
  <div className="inline sm:w-[48%] lg:w-[18%]">
    <h1 className="font-bold text-[1.3em] sm:text-[1.5em]">Stay updated</h1>
    <p className="pt-[10px] sm:pt-[15px] text-[0.9em] sm:text-[1em]">
      Get all the latest tech and developer news in one place.
    </p>
  </div>
  <div className="inline sm:w-[48%] lg:w-[18%]">
    <h1 className="font-bold text-[1.3em] sm:text-[1.5em]">Join community</h1>
    <p className="pt-[10px] sm:pt-[15px] text-[0.9em] sm:text-[1em]">
      Connect with others by commenting and sharing ideas.
    </p>
  </div>
  <div className="inline sm:w-[48%] lg:w-[18%]">
    <h1 className="font-bold text-[1.3em] sm:text-[1.5em]">Create content</h1>
    <p className="pt-[10px] sm:pt-[15px] text-[0.9em] sm:text-[1em]">
      Share your own tech posts and build your reputation.
    </p>
  </div>
  <div className="inline sm:w-[48%] lg:w-[18%]">
    <h1 className="font-bold text-[1.3em] sm:text-[1.5em]">Save Time</h1>
    <p className="pt-[10px] sm:pt-[15px] text-[0.9em] sm:text-[1em]">
      No need to browse multiple websites—find everything here.
    </p>
  </div>
  <div className="inline sm:w-[48%] lg:w-[18%]">
    <h1 className="font-bold text-[1.3em] sm:text-[1.5em]">Easy to use</h1>
    <p className="pt-[10px] sm:pt-[15px] text-[0.9em] sm:text-[1em]">
      A simple, user-friendly platform designed for tech lovers.
    </p>
  </div>

   </div>


   <div>
   <div className="pt-[20px] pl-[20px] sm:pt-[40px] sm:pl-[40px] lg:pt-[60px] lg:pl-[60px]">
  <h1 className="text-white text-[1.8em] sm:text-[2em] lg:text-[2.5em] inline font-bold">Our </h1>
  <h1 className="text-[#6ecbc6] text-[1.8em] sm:text-[2em] lg:text-[2.5em] inline font-bold">Teams</h1>
</div>
<p className="pl-[20px] pt-[20px] pr-[20px] text-white text-[1em] sm:text-[1.1em] lg:pl-[200px] lg:pt-[40px] lg:pr-[200px] lg:text-[1.2em] leading-relaxed">
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist. I love wct.
</p>
<div className="pt-[20px] sm:pt-[40px] lg:pt-[60px]"></div>
<div className="flex flex-col sm:flex-row gap-[10px] sm:gap-[15px] lg:gap-[20px] pl-[20px] sm:pl-[40px] lg:pl-[60px] pt-[20px] sm:pt-[40px] lg:pt-[60px] text-white bg-[#46686c]">
  <div>
  </div>
</div>

    <div className='flex gap-[20px] pl-[60px] pt-[60px] text-white bg-[#46686c]'>
    <div>
    <img src={Team.src} alt="A picture of group" width="400" height="500" className='pt-[30px] pl-[40px] pb-[50px] ' />
    </div>
    </div>
   </div>
     
     </div>
    </main>
  )
}

export default page
