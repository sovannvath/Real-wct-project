import Navbar from "@/components/Navbar";
import React from 'react'


const page = () => {
  return (
    <main className="bg-[#192230]" >
        <Navbar /> 

        <div className="bg-[#1a2b37] pt-[30px] md:pt-[50px] pb-[40px] md:pb-[60px]">
        <h1 className="font-bold text-[#acafb1] text-[2em] md:text-[3em] text-center"> How can we help you?</h1>
        <p className="text-[#acafb1] text-[1em] md:text-[1.5em] text-center leading-relaxed">
         Need help with something or guidance for our techs? <br />
        Check out our frequently asked questions. </p>
        </div>

        <p className="text-white text-[1.2em] md:text-[1.5em] pl-[20px] md:pl-[70px] pt-[10px] md:pt-[15px]">
        QuickFind answers
        </p>


<div className="flex flex-col items-center justify-center">
  <div className="flex flex-wrap gap-8 justify-center sm:flex-row">
    <div className="border border-white bg-[#1c2a36] p-4 rounded-lg w-full sm:max-w-[500px] sm:w-[80%] mt-8">
      <p className="text-white text-center text-lg font-semibold border-b border-[#acafb1] pb-2 mb-4">
        How do I create an account?
      </p>
      <p className="text-white text-center text-sm leading-relaxed">
        Answer: Click the "Sign Up" button at the top right of the page, fill in your details, and verify your email to activate your account.
      </p>
    </div>
    
    <div className="border border-white bg-[#1c2a36] p-4 rounded-lg w-full sm:max-w-[500px] sm:w-[80%] mt-8">
      <p className="text-white text-center text-lg font-semibold border-b border-[#acafb1] pb-2 mb-4">
        How do I create an account?
      </p>
      <p className="text-white text-center text-sm leading-relaxed">
        Answer: Click the "Sign Up" button at the top right of the page, fill in your details, and verify your email to activate your account.
      </p>
    </div>
  </div>
</div>


<div className="flex flex-col items-center justify-center">
  <div className="flex flex-wrap gap-8 justify-center sm:flex-row">
    <div className="border border-white bg-[#1c2a36] p-4 rounded-lg w-full sm:max-w-[500px] sm:w-[80%] mt-8">
      <p className="text-white text-center text-lg font-semibold border-b border-[#acafb1] pb-2 mb-4">
        How do I create an account?
      </p>
      <p className="text-white text-center text-sm leading-relaxed">
        Answer: Click the "Sign Up" button at the top right of the page, fill in your details, and verify your email to activate your account.
      </p>
    </div>
    
    <div className="border border-white bg-[#1c2a36] p-4 rounded-lg w-full sm:max-w-[500px] sm:w-[80%] mt-8">
      <p className="text-white text-center text-lg font-semibold border-b border-[#acafb1] pb-2 mb-4">
        How do I create an account?
      </p>
      <p className="text-white text-center text-sm leading-relaxed">
        Answer: Click the "Sign Up" button at the top right of the page, fill in your details, and verify your email to activate your account.
      </p>
    </div>
  </div>
</div>
       

<div className="border border-white bg-[#1c2a36] p-4 rounded-2xl max-w-full sm:max-w-[1450px] mt-10 mx-auto">
  <p className="text-white text-[1.2em] md:text-[1.5em] pt-[5px] pl-[10px] mb-8">
    Frequently asked questions
  </p>
  <div className="flex items-center justify-center mt-8 sm:mt-[80px]">
    <div className="border border-white bg-[#1c2a36] p-4 rounded-xl w-full sm:max-w-[400px] h-[50px] flex items-center justify-center">
      <p className="text-white text-[1.2em] md:text-[1.5em] text-center">
        General Question
      </p>
    </div>
  </div>
</div>    
        
    </main>  
    
  )
}

export default page
