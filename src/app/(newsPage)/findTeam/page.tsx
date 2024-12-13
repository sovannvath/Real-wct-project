import React from 'react'

const page = () => {
  return (
   <div className='bg-[#1e262b] vh-100%'>
   <h1 className='bg-[#17404a] max-h-[1000px] max-w-[1600px] sm:max-w-full sm:max-h-full font-bold text-white text-[50px] text-center' >
    Create Team
   </h1>


   {/*flex column*/}
   <div className='flex flex-row sm:flex-row-lg item-center justify-center gap-10 mt-10 '>
   <div >
    <label htmlFor="fname"  className='text-white text-[20px] mt-10'>Enter your team name : </label><br />
    <input type="text" id = "fname" name="fname" className= 'p-2 rounded-xl border border-[#17404a] bg-[#17404a] w-[400px] h-[60px] text-[15px] mt-3' placeholder ="Your team Name"/>
   </div>
   <div >
    <label htmlFor="text"  className='text-white text-[20px] mt-10'>Enter your team shortcut's name : </label><br />
    <input type="text" id = "teamshortname" name="teamshortname" className= 'p-2 rounded-xl border border-[#17404a] bg-[#17404a] w-[400px] h-[60px] text-[15px] mt-3' placeholder ="Your team shortcut's Name"/>
   </div>
   </div>

   <h1 className='text-[30px] text-center text-white mt-8 text'>
    Squad Type
   </h1>

    {/* Squad selector */}
    <div className='flex flex-row items-center justify-center gap-10 mt-10'>
        <div>
        <label htmlFor="countries" className='text-white text-[20px] '>
          Public Squad:
        </label><br />
        <select
          id="countries"
          className="bg-[#17404a] border border-[#17404a] text-white text-[15px] rounded-xl w-[400px] h-[60px] p-3 mt-5">
          <option value="">Choose a Squad</option>
          <option value="TS">Tailwind squad</option>
          <option value="LJ">Ling javascript </option>
          <option value="CN">Coding with NaNa</option>
          <option value="NC">NaTalai Coder</option>
        </select>
        </div>

        <div>
        <label htmlFor="countries" className='text-white text-[20px] mb-2'>
          Private Squad:
        </label><br />
        <select
          id="countries"
          className="bg-[#17404a] border border-[#17404a] text-white text-[15px] rounded-xl w-[400px] h-[60px] p-3 mt-5">
          <option value="">Choose a Squad</option>
          <option value="TS">Tailwind squad</option>
          <option value="LJ">Ling javascript </option>
          <option value="CN">Coding with NaNa</option>
          <option value="NC">NaTalai Coder</option>
        </select>
        </div>
      </div>

      <h1 className='text-[30px] text-center text-white mt-8 text'>
    Moderate Setting
   </h1>
      <div className='ml-[200px]'>
        <label htmlFor="countries" className='text-white text-[20px] '>
          Post Control :
        </label><br />
        <label htmlFor="countries" className='text-[#acafb1] text-[18px] '>
        You can choose who is allowed to post new content 
        </label><br />
        <select
          id="countries"
          className="bg-[#17404a] border border-[#17404a] text-white text-[15px] rounded-xl w-[600px] h-[60px] p-3 mt-5">
          <option value="">All members are allow</option>
          <option value="TS">Only admin of this group is allow to post</option>
        </select>
        </div>

        <h1 className='text-[30px] text-center text-white mt-8 text'>
    Admin control :
   </h1>
      <div className='ml-[200px] mt-[40px]'>
        <label htmlFor="countries" className='text-white text-[20px] '>
        Select your option :
        </label><br />
        <label htmlFor="countries" className='text-[#acafb1] text-[18px] '>
        Turn this on so when the members post something they will need admin’s approval first .
        </label><br />
        <select
          id="countries"
          className="bg-[#17404a] border border-[#17404a] text-white text-[15px] rounded-xl w-[700px] h-[60px] p-3 mt-5">
          <option value="">Turn On</option>
          <option value="TS">Turn Off</option>
        </select>
        </div>

<div className='ml-[200px] mt-[40px]'>
<label htmlFor="countries" className='text-white text-[20px] '>
Select your option :
</label><br />
<label htmlFor="countries" className='text-[#acafb1] text-[18px] '>
Turn this on if only you is allowed to invite new memebers into the team .
</label><br />
<select
  id="countries"
  className="bg-[#17404a] border border-[#17404a] text-white text-[15px] rounded-xl w-[700px] h-[60px] p-3 mt-5 pb[100px]">
  <option value="">Turn On</option>
  <option value="TS">Turn Off</option>
</select>
</div>

<h1 className='bg-[#1e262b] text-[#1e262b] mt-30px'>
  Hellooo
</h1><br />
<h1>
  hi
</h1>

</div>

);
};

export default page;