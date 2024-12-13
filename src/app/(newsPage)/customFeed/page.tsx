import React from 'react'

const page = () => {
  return (
    <div className='bg-[#1e262b] h-screen md:h-screen'>
        <h1 className='text-white font-bold text-[20px] ml-[30px] pt-[30px] max-w-full'>
        Pick tag to get a specific feed
        </h1>

      <div className='flex gap-[15px] items-center justify-center sm:gap-[10px] mt-[10px] sm:ml-[100px]'>
        <button className='text-white bg-[#15919b] w-[80px] h-[40px] rounded-[15px] '>Discard</button>
        <button className='text-white bg-[#15919b] w-[80px] h-[40px] rounded-[15px] '>Apply</button>
      </div>

     <hr className="bg-[#1e262b] border-0 h-[3px] bg-gradient-to-r from-[#53cacd] to-[#f46537] mt-[15px]" />

      {/* Search and Tag Section */}
      <div className="max-w-screen-xl mx-auto">
      <div className="border-2 border-[#788093] bg-[#1e262b] max-w-[900px] h-auto sm:h-[650px] md:h-[530px] lg:h-[530px] xl:h-[530px] rounded-xl items-center mx-auto mt-[50px]">
  {/* Search Input */}
  <div className="flex items-center justify-center mt-[40px]">
    <input
      type="text"
      className="text-white border border-[#788093] bg-[#1e262b] w-[350px] h-[35px] rounded-[10px] mx-auto"
      placeholder="Search tag, Ex: javascript, html, python, etc..."
    />
  </div>

  {/* Tag Buttons Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4 mt-[60px]">
    {["Java", "Python", "JavaScript", "HTML", "CSS", "AI", "Tailwind", "Sass", "C++", "TypeScript", "Database", "Figma", "React Js", "Next Js", "C#", "C", "Node JS", "UI", "UX", "PHP", "Swift", "Rust", "Go", "SQL"].map((tag) => (
      <button
        key={tag}
        type="button"
        className="text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800 w-full sm:w-auto"
      >
        {tag}
      </button>
    ))}
  </div>
</div>

        
      </div>
    </div>
  )
}

export default page
