
import React from 'react'
import icon1 from "./images/iconaboutus1.png"
import icon2 from "./images/iconaboutus2.jpg"
import icon3 from "./images/iconaboutus3.jpg"
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
    <div className='pl-[60px] pt-[60px] '>
    <h1 className='text-white text-[2.5em] inline font-bold'>We provide the latest in technology <br />
    <span> news. </span>
   </h1>
    <h1 className='text-[#6ecbc6] text-[2.5em] inline font-bold' >TogetherTechs</h1><br /><br />
    </div>
    <div className='flex text-white'>
    <div className='flex text-[1.5em] w-[45%] mr-[55px] mt-[45px] ml-[60px] '>
    " TogetherTechs is idk naa <br />
please complete.i just ffffd <br />
dak ton oy complete.ffffffff<br />
please complete.i just ffffd <br />
please complete.i just ffffd <br />
please complete.i just ffffd <br />
please complete.i just ffffd <br />
please complete.i just ffffd <br />
please complete.i just ffffd <br />
please complete.i just ffffd <br />
please complete.i just ffffd."<br />
    </div>
     <div className='flex flex-col mt-[100px]'>
        <h1 className='text-[2.2em] mb-[40px] font-bold'>About us</h1>
     <div className='flex gap-[15px]' >
        <div className='inline'>
            <img src={icon1.src} alt="A picture of an icon "/>
            <h1 className='font-bold text-[1.5em]'>
                Our mission
            </h1>
            <p className='text-[1.2em]'>Ask gpt4 I don’t know hi guy welcome to my channel.i love coding html css.</p>
        </div>
        <br />
        <div className='inline'>
        <img src={icon2.src} alt="A picture of an icon "/>
        <h1 className='font-bold text-[1.5em]'>
                Our Offer 
            </h1>
            <p className='text-[1.2em]'>Ask gpt4 I don’t know hi guy welcome to my channel.i love coding html css.</p>
        </div>
        <br />
        <div className='inline'>
        <img src={icon3.src} alt="A picture of an icon "/>
           <h1 className='font-bold text-[1.5em]'>
                our unique value 
            </h1>
            <p className='text-[1.2em]'>
            Ask gpt4 I don’t know hi guy welcome to my channel.i love coding html css. 
            </p>
        </div> 
     </div>
     </div>
    </div>


   <div>
   <div className='pl-[60px] pt-[60px]'>
     <h1 className='text-white text-[2.5em] inline font-bold'>Our </h1>
     <h1 className='text-[#6ecbc6] text-[2.5em] inline font-bold' >Benefits</h1>
     </div>
     <h1 className='pl-[200px] pt-[40px] pr-[200px] text-white text-[1.2em]'>Lorem Ipsum is simply dummy text of
    the printing and typesetting industry. Lorem Ipsum has been the industry's
    standard dummy text ever since the 1500s, when an So I started to walk into the water. I
    won't lie to you boys, I was terrified. But I pressed on, and as I made my way
    past the breakers a strange calm came over me. I don't know if it was divine inter
    vention or the kinship of all living things but I tell you Jerry at that moment, I 
    was a marine biologist. I love wct. </h1>
     <div className='flex gap-[20px] pl-[60px] pt-[60px] text-white' >
        <div className='inline'>
            <h1 className='font-bold text-[1.5em]'>
                Stay upload
            </h1>
            <p className='pt-[15px]'>Get all the latest tech and developer news in one place.</p>
        </div>
        <br />
        <div className='inline'>
        <h1 className='font-bold text-[1.5em]'>
                Join community
            </h1>
            <p className='pt-[15px]'>Connect with others by commenting and sharing ideas.</p>
        </div>
        <br />
        <div className='inline'>
           <h1 className='font-bold text-[1.5em]'>
                Create content 
            </h1>
            <p className='pt-[15px]'>Share your own tech posts and build your reputation.</p>
        </div> 
        <div className='inline'>
           <h1 className='font-bold text-[1.5em]'>
                Save Time 
            </h1>
            <p className='pt-[15px]'>
            No need to browse multiple websites—find everything here.
            </p>
        </div> 
        <div className='inline'>
           <h1 className='font-bold text-[1.5em]'>
                Easy to use
            </h1>
            <p className='pt-[15px]'>
            A simple, user-friendly platform designed for tech lovers.
            </p>
        </div> 
   </div>


   <div>
    <div className='pt-[60px] pl-[60px]'>
    <h1 className='text-white text-[2.5em] inline font-bold'>Our </h1>
    <h1 className='text-[#6ecbc6] text-[2.5em] inline font-bold' >Teams</h1>
    </div>
    <h1 className='pl-[200px] pt-[40px] pr-[200px] text-white text-[1.2em]'>Lorem Ipsum is simply dummy text of
    the printing and typesetting industry. Lorem Ipsum has been the industry's
    standard dummy text ever since the 1500s, when an So I started to walk into the water. I
    won't lie to you boys, I was terrified. But I pressed on, and as I made my way
    past the breakers a strange calm came over me. I don't know if it was divine inter
    vention or the kinship of all living things but I tell you Jerry at that moment, I 
    was a marine biologist. I love wct. </h1>
    <div className='pt-[60px]'>
    </div>
    <div className='flex gap-[20px] pl-[60px] pt-[60px] text-white bg-[#46686c]'>
    <div>
    <img src={Team.src} alt="A picture of group" width="400" height="500" className='pt-[50px] pl-[40px]' />
    </div>

    </div>


    

   </div>
     
     </div>
    </main>
  )
}

export default page
