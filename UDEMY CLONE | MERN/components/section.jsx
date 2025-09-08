import React from 'react'

function Section(){
    
  return (
    <>
     <div className='mt-[50px] md:mt-[70px] lg:mt-[100px]'>

        <div className='flex flex-col items-center'>

      <div>
        <p className='text-[18px] text-gray-600 font-semibold'>Trusted by learners from</p>
          
          </div>

          <div className="flex flex-wrap gap-6 md:gap-10 lg:gap-14 mt-[40px] max-w-[900px]">
       <img className="h-[20px] md:h-[25px] lg:h-[30px]" src="/microsoft.svg" />
       <img className="h-[20px] md:h-[25px] lg:h-[30px]" src="/adobe.svg" />
       <img className="h-[20px] md:h-[25px] lg:h-[30px]" src="/accenture.svg" />
       <img className="h-[20px] md:h-[25px] lg:h-[30px]" src="/paypal.svg" />
         </div>
          
          <div className=' mt-[50px] md:mt-[70px] lg:mt-[80px] flex flex-col text-center gap-4'> 
          <p className='font-semibold text-3xl'>
            Learn from the best
          </p>
          <p className='mx-4'>
            Discover our top-rated courses across various categories. From coding and design to business , our courses are crafted to deliver results.
          </p>
          </div>

    </div>

    </div>
    </>
   
   
  )
}
export default Section;
