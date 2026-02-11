import React from 'react'

const Features = () => {
  return (
    <section id="features" className="bg-black py-20">
      <h1 className="text-3xl font-semibold text-center mx-auto text-white">Powerful Features</h1>
      <p className="text-sm text-gray-400 text-center mt-2 max-w-md mx-auto">Everything you need to manage, track, and grow your finances, securely and efficiently.</p>
      
      <div className="flex flex-wrap items-center justify-center gap-10 mt-16">
        <div className="max-w-80 hover:-translate-y-0.5 transition duration-300">
          <img className="rounded-xl" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-1.png" alt="" />
          <h3 className="text-base font-semibold text-white mt-4">Smart investment recommendations</h3>
          <p className="text-sm text-gray-400 mt-1">Understand where to invest and how to grow with intelligent, personalized insights.</p>
        </div>
        <div className="max-w-80 hover:-translate-y-0.5 transition duration-300">
          <img className="rounded-xl" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-2.png" alt="" />
          <h3 className="text-base font-semibold text-white mt-4">User management</h3>
          <p className="text-sm text-gray-400 mt-1">Get instant insights into your finances with live dashboards.</p>
        </div>
        <div className="max-w-80 hover:-translate-y-0.5 transition duration-300">
          <img className="rounded-xl" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-3.png" alt="" />
          <h3 className="text-base font-semibold text-white mt-4">Investment Insights</h3>
          <p className="text-sm text-gray-400 mt-1">Get AI-generated suggestions based on risk profile, goals, and market trends</p>
        </div>
      </div>
    </section>
  )
}

export default Features