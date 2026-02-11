import React from 'react'

const CallToAction = () => {
  return (
    <section className="bg-black py-16 sm:py-20">
    <div className='border-y border-dashed border-gray-700 w-full max-w-5xl mx-auto px-10 sm:px-16'>
            <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 border-x border-dashed border-gray-700 py-16 sm:py-20 -mt-10 -mb-10 w-full">
                <p className="text-xl font-medium max-w-md text-white">Star the repo and join the growing PrebuiltUI community.</p>
                <a href="https://prebuiltui.com" className="flex items-center gap-2 rounded py-3 px-8 bg-indigo-600 hover:bg-indigo-700 transition text-white">
                    <span>Star On Github</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
            </div>
        </div>
    </section>
  )
}

export default CallToAction