

import React from 'react'
import styles from "./images/Robot.png"
import icon1 from "./images/iconaboutus1.png"
import icon2 from "./images/iconaboutus2.jpg"
import icon3 from "./images/iconaboutus3.jpg"
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
    <img src={styles.src} alt="A picture of a robot "  width="300"/>
    <div className='flex text-[1.5em] w-[45%] mr-[55px] mt-[45px]'>
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
            <p>Ask gpt4 I don’t know hi guy welcome to my channel.i love coding html css.</p>
        </div>
        <br />
        <div className='inline'>
        <img src={icon2.src} alt="A picture of an icon "/>
        <h1 className='font-bold text-[1.5em]'>
                Our Offer 
            </h1>
            <p>Ask gpt4 I don’t know hi guy welcome to my channel.i love coding html css.</p>
        </div>
        <br />
        <div className='inline'>
        <img src={icon3.src} alt="A picture of an icon "/>
           <h1 className='font-bold text-[1.5em]'>
                our unique value 
            </h1>
            <p>
            Ask gpt4 I don’t know hi guy welcome to my channel.i love coding html css. 
            </p>
        </div> 
     </div>
     </div>
    </div>
    <div className='pl-[60px] pt-[60px]'>
     <h1 className='text-white text-[2.5em] inline font-bold'>Our </h1>
     <h1 className='text-[#6ecbc6] text-[2.5em] inline font-bold' >Benefits</h1>
     </div>
    </main>
  )
}

export default page
